import Form from './pages/Form/Form'
import Loading from './components/Loading'
import api from './utils/api'
import { useEffect, useState } from 'react'
import type { stateApp, stateLoad, stateUserAuth } from './types/typeStates'
import User from './pages/User/User'

export default function App() {
  const [load, setLoad] = useState<stateLoad>({ status: 'load' })
  const [app, setApp] = useState<stateApp>({ status: 'none' })
  const [userAuth, setUserAuth] = useState<stateUserAuth>(null)

  // Ocurre una sola vez, cuando toda la APP se renderice
  useEffect(() => {
    ;(async () => {
      const TOKEN = localStorage.getItem('TOKEN')

      if (TOKEN) {
        try {
          const res: stateUserAuth = await api<stateUserAuth>('/api/auth/me', { method: 'GET', headers: { Authorization: `Bearer ${TOKEN}` } })
          console.log(res)
          setUserAuth(res)
          setApp({ status: 'success' })
          setLoad({ status: 'idle' })
          return
        } catch (error) {
          console.error((error as Error).message)
          setUserAuth(null)
          setApp({ status: 'idle' })
          setLoad({ status: 'idle' })
          return
        }
      }

      setUserAuth(null)
      setApp({ status: 'idle' })
      setLoad({ status: 'idle' })
    })()
  }, [])

  function handleLoading(stl: stateLoad) {
    setLoad(stl)
  }

  function handleSubmitForm(stua: stateUserAuth) {
    setApp({ status: 'success' })
    setUserAuth(stua)
  }

  function handleOnDisconnect() {
    localStorage.removeItem('TOKEN')
    setLoad({ status: 'load' })
    setApp({ status: 'idle' })
    setLoad({ status: 'idle' })
    setUserAuth(null)
  }

  return (
    <>
      {app.status === 'idle' && <Form onLoad={handleLoading} onSubmit={handleSubmitForm} />}
      {app.status === 'success' && <User data={userAuth!} onDisconnect={handleOnDisconnect} />}
      {load.status === 'load' && <Loading />}
    </>
  )
}
