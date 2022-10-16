import { createRoot } from 'react-dom/client'
import { asyncWithLDProvider, LDProvider } from 'launchdarkly-react-client-sdk'
import App from './App'
import 'antd/dist/antd.css'

const mainElement = async (clientId: string | null) => {
  if (clientId === null) return <App ldClientAvailable={ false } />
  const LDProvider = await asyncWithLDProvider({
    clientSideID: clientId
  })
  return (
    <LDProvider>
      <App ldClientAvailable={ true } />
    </LDProvider>
  )
}

(async () => {
  // Set clientSideID to your own Client-side ID. You can find this in
  // your LaunchDarkly portal under Account settings / Projects
  const configuration = await fetch("/configuration")
  const { ldClientId } = await configuration.json()
  const element = await mainElement(ldClientId)
  createRoot(document.getElementById("root")!).render(element)
})();