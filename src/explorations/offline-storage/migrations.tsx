import { useId, useState } from 'react'
import {
  createSongaraDb,
  songaraDbName,
  sortSchemaVersions,
  type EntityTable,
  type SongaraSchemaVersion,
} from '@songara/pwa-base/preview/dexie'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

type ItemRow = {
  id: number
  title: string
  label?: string
}

type MigrateDb = ReturnType<typeof createSongaraDb> & {
  items: EntityTable<ItemRow, 'id'>
}

const DB_NAME = songaraDbName('test-pwa', 'catalogue-migrate-demo')

const V1: SongaraSchemaVersion = {
  version: 1,
  stores: { items: '++id, title' },
}

const V2: SongaraSchemaVersion = {
  version: 2,
  stores: { items: '++id, title, label' },
  upgrade: async (tx) => {
    await tx
      .table('items')
      .toCollection()
      .modify((row: ItemRow) => {
        row.label = row.title ?? 'untitled'
      })
  },
}

/**
 * Exploration: schema migrations via Preview Dexie version helpers.
 */
export function OfflineStorageMigrationsPage() {
  const record = getExploration('offline-storage', 'migrations')
  const seedId = useId()
  const [seedTitle, setSeedTitle] = useState('seed')
  const [log, setLog] = useState<string[]>([])
  const [rows, setRows] = useState<ItemRow[]>([])
  const [verno, setVerno] = useState<number | null>(null)

  function pushLog(line: string) {
    setLog((prev) => [line, ...prev].slice(0, 8))
  }

  async function resetDb() {
    const db = createSongaraDb({
      name: DB_NAME,
      versions: [V1],
    })
    await db.delete()
    setRows([])
    setVerno(null)
    pushLog('Deleted IndexedDB — ready to seed v1')
  }

  async function seedV1() {
    await resetDb()
    const db = createSongaraDb({
      name: DB_NAME,
      versions: [V1],
    }) as MigrateDb
    try {
      await db.open()
      await db.items.add({ title: seedTitle.trim() || 'seed' })
      const all = await db.items.toArray()
      setRows(all)
      setVerno(db.verno)
      pushLog(`Opened v${db.verno}; seeded ${all.length} row(s)`)
    } finally {
      db.close()
    }
  }

  async function migrateToV2() {
    const ordered = sortSchemaVersions([V2, V1])
    const db = createSongaraDb({
      name: DB_NAME,
      versions: ordered,
    }) as MigrateDb
    try {
      await db.open()
      const all = await db.items.toArray()
      setRows(all)
      setVerno(db.verno)
      pushLog(
        `Migrated to v${db.verno}; labels filled via upgrade hook (${all.length} row(s))`,
      )
    } finally {
      db.close()
    }
  }

  if (!record) return null

  return (
    <ExplorationShell
      areaId="offline-storage"
      explorationId="migrations"
      record={record}
      lead="Schema version patterns via `@songara/pwa-base/preview/dexie` (`createSongaraDb`, `sortSchemaVersions`, upgrade hooks). App owns tables; Preview owns conventions."
      visualNote="Visual validation: Seed v1 → rows have title only; Migrate to v2 → label copied from title and schema verno becomes 2."
      performance={
        <p>
          Upgrades run once per client; keep hooks small. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Same IndexedDB surface as Dexie core. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>
            Ordered versions + <code>upgrade</code> hooks in one Preview API
          </li>
          <li>
            <code>sortSchemaVersions</code> validates duplicates / ordering
          </li>
          <li>Matches product migration style without a local helper fork</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Destructive reset in this demo — products must plan forward-only</li>
          <li>Complex data transforms still app-authored</li>
          <li>Preview may refine helpers before Stable</li>
        </ul>
      }
      developerExperience={
        <p>
          Clear version list over ad-hoc <code>db.version()</code> chains. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Feature-flagged schema bumps, backfilling derived columns, renaming
          indexes without rewriting Dexie boilerplate.
        </p>
      }
      reusableIdeas={
        <p>
          Prefer <code>createSongaraDb</code> + <code>SongaraSchemaVersion[]</code> in
          products. See also the Dexie exploration for CRUD on a stable schema.
        </p>
      }
    >
      <div className="cat__controls">
        <p className="cat__muted">
          {DB_NAME}
          {verno != null ? ` · open schema v${verno}` : ' · not open'}
        </p>
        <div className="cat__demo-row">
          <label htmlFor={seedId}>
            Seed title{' '}
            <input
              id={seedId}
              value={seedTitle}
              onChange={(e) => setSeedTitle(e.target.value)}
              autoComplete="off"
            />
          </label>
          <button type="button" onClick={() => void seedV1()}>
            Seed v1
          </button>
          <button type="button" onClick={() => void migrateToV2()}>
            Migrate to v2
          </button>
          <button type="button" onClick={() => void resetDb()}>
            Delete DB
          </button>
        </div>
      </div>
      <ul className="cat__note-list">
        {rows.length === 0 ? (
          <li className="cat__muted">No rows — seed v1 first.</li>
        ) : (
          rows.map((r) => (
            <li key={r.id}>
              <strong>{r.title}</strong>
              <span className="cat__muted">
                {' '}
                · id {r.id}
                {r.label != null ? ` · label “${r.label}”` : ' · (no label yet)'}
              </span>
            </li>
          ))
        )}
      </ul>
      <ol className="cat__muted">
        {log.map((line, i) => (
          <li key={`${i}-${line}`}>{line}</li>
        ))}
      </ol>
    </ExplorationShell>
  )
}
