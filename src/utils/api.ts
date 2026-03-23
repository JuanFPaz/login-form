export default async function api<T>(url: string, options: RequestInit): Promise<T> {
  const res: Response = await fetch('http://localhost:3000' + url, options)
  if (!res.ok) {
    if (res.status === 404) {
      const err: any = await res.json()
      throw new Error(`${err.status} - ${err.message}`)
    }

    throw new Error(`${res.status} - ${res.statusText}`)
  }
  return res.json() as T
}

export type resRegister = {
  status: number
  message: string
}

export type resLogin = {
  status: number
  message: string
  token: string
}

export type userRegister = {
  username: string
  password: string
  info: {
    name: string
    lastname: string
    email: string
    birthday: string
    country: string
  }
}

export type userLogin = {
  username:string,
  password:string
}

export type userAuth = {
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