import { useEffect, useId, useState } from 'react'
import {
  createSongaraDb,
  songaraDbName,
  type EntityTable,
} from '@songara/pwa-base/preview/dexie'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

type NoteRow = {
  id: number
  title: string
  createdAt: number
}

type CatalogueNotesDb = ReturnType<typeof createSongaraDb> & {
  notes: EntityTable<NoteRow, 'id'>
}

const DB_NAME = songaraDbName('test-pwa', 'catalogue-notes')

function openNotesDb(): CatalogueNotesDb {
  const db = createSongaraDb({
    name: DB_NAME,
    versions: [
      {
        version: 1,
        stores: { notes: '++id, title, createdAt' },
      },
    ],
  }) as CatalogueNotesDb
  return db
}

/**
 * Exploration: Dexie via `@songara/pwa-base/preview/dexie` (same API products use).
 */
export function OfflineStorageDexiePage() {
  const record = getExploration('offline-storage', 'Dexie.js/Overview')
  const titleId = useId()
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState<NoteRow[]>([])
  const [status, setStatus] = useState('Opening…')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const db = openNotesDb()

    async function refresh() {
      try {
        await db.open()
        const rows = await db.notes.orderBy('createdAt').reverse().toArray()
        if (!cancelled) {
          setNotes(rows)
          setStatus(`${DB_NAME} · schema v${db.verno} · ${rows.length} note(s)`)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
          setStatus('Failed to open')
        }
      }
    }

    void refresh()

    return () => {
      cancelled = true
      db.close()
    }
  }, [])

  async function withDb(run: (db: CatalogueNotesDb) => Promise<void>) {
    const db = openNotesDb()
    try {
      await db.open()
      await run(db)
      const rows = await db.notes.orderBy('createdAt').reverse().toArray()
      setNotes(rows)
      setStatus(`${DB_NAME} · schema v${db.verno} · ${rows.length} note(s)`)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      db.close()
    }
  }

  if (!record) return null

  return (
    <ExplorationShell
      areaId="offline-storage"
      relativePath="Dexie.js/Overview"
      record={record}
      lead="Ergonomic IndexedDB via PWA-Base Preview (`@songara/pwa-base/preview/dexie`). Validates the same surface products will import — not a local wrapper."
      visualNote="Visual validation: adding a note should persist across reload; Clear DB should empty the list. Status line shows songaraDbName + schema version."
      performance={
        <p>
          Strong for structured offline CRUD; large scans need indexes. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          IndexedDB in modern evergreen browsers (Dexie core). Score{' '}
          {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>Typed tables and query helpers over raw IDB</li>
          <li>Songara helpers: <code>songaraDbName</code>, <code>createSongaraDb</code></li>
          <li>App-owned schemas — Preview stays thin</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Preview API may evolve before Stable graduation</li>
          <li>No sync / Dexie Cloud on this surface</li>
          <li>Still IndexedDB constraints (quota, workers)</li>
        </ul>
      }
      developerExperience={
        <p>
          High DX for local durable state; peer <code>dexie</code> is installed by the
          consumer. Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Offline drafts, settings caches, local-first catalogues, queue-before-sync
          stores (sync product separate).
        </p>
      }
      reusableIdeas={
        <p>
          Import <code>@songara/pwa-base/preview/dexie</code> in products — never
          deep-import <code>@platform/preview-dexie</code> or duplicate a local
          wrapper. Keep packStore for Content Pack runtime storage only.
        </p>
      }
    >
      <div className="cat__controls">
        <p className="cat__muted">{status}</p>
        {error ? <p role="alert">{error}</p> : null}
        <form
          className="cat__demo-row"
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = title.trim()
            if (!trimmed) return
            void withDb(async (db) => {
              await db.notes.add({
                title: trimmed,
                createdAt: Date.now(),
              })
            }).then(() => setTitle(''))
          }}
        >
          <label htmlFor={titleId}>
            Note title{' '}
            <input
              id={titleId}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Offline draft"
              autoComplete="off"
            />
          </label>
          <button type="submit">Add note</button>
          <button
            type="button"
            onClick={() =>
              void withDb(async (db) => {
                await db.notes.clear()
              })
            }
          >
            Clear notes
          </button>
        </form>
      </div>
      <ul className="cat__note-list">
        {notes.length === 0 ? (
          <li className="cat__muted">No notes yet — add one to exercise Preview Dexie.</li>
        ) : (
          notes.map((n) => (
            <li key={n.id}>
              <strong>{n.title}</strong>
              <span className="cat__muted">
                {' '}
                · id {n.id} · {new Date(n.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </ExplorationShell>
  )
}
