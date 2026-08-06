import { SoloSiteApp, ThemeProvider } from '@songara/pwa-base'
import { BrowserRouter } from 'react-router-dom'
import { testSite } from './site'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SoloSiteApp site={testSite} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
