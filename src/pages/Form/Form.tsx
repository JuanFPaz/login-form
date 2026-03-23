import { useState } from 'react'
import { type stateForm, type stateLoad, type stateUserAuth } from '../../types/typeStates'
import SignUp from './components/Signup/SignUp'
import Login from './components/Login/Login'
import Button from '../../components/Button'
import './Form.css'
import api from '../../../../login-form/src/utils/api'

type userAuth = {
  id: string
  username: string
  info: {
    name: string
    lastname: string
    email: string
    birthday: string
    country: string
  }
}

export default function Form({onLoad, onSubmit}:{onLoad:(stl:stateLoad)=>void, onSubmit:(stua:stateUserAuth)=>void}) {
  const [form, setForm] = useState<stateForm>({ status: 'login' })


  function handleLogin() {
    setForm({ status: 'login' })
  }
  function handleRegister() {
    setForm({ status: 'register' })
  }

  async function handleSubmit(token:string) {
    try {
      const res: userAuth = await api<userAuth>('/api/auth/me', { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
      localStorage.setItem('TOKEN', token)
      onSubmit(res)
    } catch (error) {
      console.log(error)
    }
    onLoad({status:'idle'})
  }

  return (
    <>
      <div className='form-container'>
        <div className='form'>
          <div className='button-group'>
            <Button id='login' onClick={handleLogin} textContent='Log In'></Button>
            <Button id='register' onClick={handleRegister} textContent='Sign Up'></Button>
          </div>
          <div className='title'>Welcome</div>
          <div className='subtitle'>{form.status === 'login' ? 'Log In' : 'Sign Up'}</div>
          {form.status === 'login' && <Login onLoad={onLoad} onSubmit={handleSubmit} />}
          {form.status === 'register' && <SignUp onSubmit={onLoad} />}
        </div>
      </div>
    </>
  )
}
