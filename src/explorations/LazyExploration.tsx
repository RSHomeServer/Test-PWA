import { Suspense, type ComponentType, type LazyExoticComponent } from 'react'

/** Suspense boundary for lazy catalogue exploration pages. */
export function LazyExploration({
  Page,
}: {
  Page: LazyExoticComponent<ComponentType>
}) {
  return (
    <Suspense
      fallback={
        <main className="cat">
          <p className="cat__muted">Loading exploration…</p>
        </main>
      }
    >
      <Page />
    </Suspense>
  )
}
