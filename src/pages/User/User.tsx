import type { userAuth } from '../../utils/api'
import Button from '../../components/Button'

type userProps = {
  data: userAuth
  onDisconnect: () => void
}

export default function User({ data, onDisconnect }: userProps) {
  const userAuth: userAuth = data

  function handleOnClick() {
    onDisconnect()  
  }

  return (
    <div className='userPage'>
      <div className='userHeader'>
        <h1>User Name: {userAuth.username}</h1>
      </div>
      <div>
        <Button id='disconnect' textContent='Disconnect' onClick={handleOnClick}></Button>
      </div>
      <div className='userInfo'>
        <li>
          Full Name: {userAuth.info.name} {userAuth.info.lastname}
        </li>
        <li>Birthday: {userAuth.info.birthday}</li>
        <li>Email: {userAuth.info.email}</li>
        <li>Country: {userAuth.info.country}</li>
      </div>
    </div>
  )
}
