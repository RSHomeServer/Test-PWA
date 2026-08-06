import './HomePage.css'

/**
 * Minimal branded home — validates SoloSiteApp chrome + ThemeProvider tokens.
 */
export function HomePage() {
  return (
    <main className="test-home">
      <h1 className="test-home__brand">Test PWA</h1>
      <p className="test-home__lead">
        Hello-style consumer of <code>@songara/pwa-base</code> for foundation
        visual validation.
      </p>
    </main>
  )
}
