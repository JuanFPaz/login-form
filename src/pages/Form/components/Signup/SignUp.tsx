import { useState, useEffect } from "react";
import api, { type resRegister, type userRegister } from '../../../../utils/api'
import Input from "../../../../components/Input";
import type { stateLoad, stateMessage } from "../../../../types/typeStates";

type propsSignUp = {
  onSubmit:(st:stateLoad)=>void
}

export default function SignUp({onSubmit}:propsSignUp) {
  const [message, setMessage] = useState<stateMessage>({ status: 'idle' })

  useEffect(() => {
    if (message.status === 'success') alert(message.data)
    if (message.status === 'error') alert(message.error)
  }, [message])

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({status:'load'})
    const fd: FormData = new FormData(event.currentTarget)
    const bodyUser: userRegister = {
      username: fd.get('username') as string,
      password: fd.get('password') as string,
      info: {
        name: fd.get('name') as string,
        lastname: fd.get('lastname') as string,
        email: fd.get('email') as string,
        birthday: fd.get('birthday') as string,
        country: fd.get('country') as string,
      },
    }

    try {
      const res = await api<resRegister>('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyUser) })
      setMessage({ status: 'success', data: res.message })
    } catch (err) {
      setMessage({ status: 'error', error: (err as Error).message })
    }
    onSubmit({status:'idle'})
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input id='name' className='input' type='text' textContent='First Name' required={true}/>
      <Input id='lastname' className='input' type='text' textContent='Last Name' required={true}/>
      <Input id='username' className='input' type='text' textContent='Username' required={true}/>
      <Input id='password' className='input' type='password' textContent='Password' required={true}/>
      <Input id='repeatpass' cut="cut-long" className='input' type='password' textContent='Repeat Password' required={true}/>
      <Input id='email' cut='cut-short' className='input' type='email' textContent='Email' required={true}/>
      <Input id='birthday' className='input' type='date' textContent='Birthday' required={true}/>
      <Input id='country' cut='cut-medium' className='input' type='text' textContent='Country' required={true}/>
      <button type='submit' className='submit'>
        Create Account
      </button>
    </form>
  )
}