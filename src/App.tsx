import { Alert, Layout, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useEffect, useState } from 'react'
import "./App.css"

interface Props {
  ldClientAvailable: boolean
}

export default function App({ ldClientAvailable }: Props) {

  const { demoFeatureToggle } = useFlags()

  const [reactDemoFlag, setReactDemoFlag] = useState<boolean>(false)
  const [springDemoFlag, setSpringDemoFlag] = useState<boolean>(false)

  const { Title } = Typography

  const reactSDKElement = () => {
    if (ldClientAvailable === true) {
      return (
        <>
          <Alert message="React SDK is enabled" type="success" showIcon />
          <Alert
            message={ `Demo Feature Toggle is ${demoFeatureToggle === true ? 'enabled' : 'disabled'}` }
            type={ `${demoFeatureToggle === true ? 'success' : 'error'}` }
            showIcon />
        </>
      )
    }
    return <Alert message="React SDK is disabled" type="error" showIcon />
  }

  const reactFlagElement = () => {
    return reactDemoFlag === true ? (
      <Alert message="React Demo Flag is enabled" type="success" showIcon />
    ) : (
      <Alert message="React Demo Flag is disabled" type="error" showIcon />
    )
  }

  const springFlagElement = () => {
    return springDemoFlag === true ? (
      <Alert message="Spring Demo Flag is enabled" type="success" showIcon />
    ) : (
      <Alert message="Spring Demo Flag is disabled" type="error" showIcon />
    )
  }

  useEffect(() => {
    fetch("/flags")
      .then(response => response.json())
      .then((result: { reactDemoFlag: boolean, springDemoFlag: boolean }) => {
        setReactDemoFlag(result.reactDemoFlag)
        setSpringDemoFlag(result.springDemoFlag)
      })
  })

  return (
    <Layout>
      <Content>
        <Title>LaunchDarkly barebones demo</Title>
        { reactSDKElement() }
        { reactFlagElement() }
        { springFlagElement() }
      </Content>
    </Layout>
  )
}