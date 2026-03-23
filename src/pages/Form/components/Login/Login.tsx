import { useState, useEffect } from "react";
import api, { type resLogin, type userLogin } from "../../../../../../login-form/src/utils/api"
import Input from "../../../../components/Input";
import type { stateLoad, stateMessage } from "../../../../types/typeStates";

type propsLogin = {
  onLoad:(st:stateLoad)=>void,
  onSubmit:(tk:string)=>void
}

export default function Login({onLoad,onSubmit}:propsLogin) {
  const [message, setMessage] = useState<stateMessage>({ status: 'idle' })

  useEffect(() => {
    if (message.status === 'success') alert(message.data)
    if (message.status === 'error') alert(message.error)
  }, [message])

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onLoad({status:'load'})
    const fd: FormData = new FormData(event.currentTarget)
    const bodyUser:userLogin = Object.fromEntries(fd) as userLogin

    try {
      const res = await api<resLogin>('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyUser) })
      console.log(res);
      setMessage({ status: 'success', data: res.message })
      onSubmit(res.token)
    } catch (err) {
      setMessage({ status: 'error', error: (err as Error).message })
      onLoad({status:'idle'})
    }
  }

  return (
    <form id='signUp' onSubmit={handleSubmit}>
      <Input id='username' className='input' type='text' textContent='Username' required={true}/>
      <Input id='password' className='input' type='password' textContent='Password' required={true}/>
      <button type='submit' className='submit'>
        Log In
      </button>
    </form>
  )
}

