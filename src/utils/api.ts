// const DEV_URL = 'http://localhost:3000'
 const PROD_URL = 'https://jwt-prueba.onrender.com'

export default async function api<T>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const res: Response = await fetch(PROD_URL + url, options);
  if (!res.ok) {
    if (res.status === 404) {
      const err: any = await res.json();
      throw new Error(`${err.status} - ${err.message}`);
    }

    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json() as T;
}



export async function getUserAuth<T>(url: string): Promise<T> {
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  return await api<T>(url, options);
}

export async function postClearCookie<T>(url:string):Promise<T>{
    const options: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
  };

  return await api<T>(url,options)
}

export async function postUserAuth<T>(
  url: string,
  body: userLogin | userRegister,
) {
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return await api<T>(url, options);
}

export type resLogout = resRegister

export type resRegister = {
  status: number;
  message: string;
};

export type resLogin = {
  status: number;
  message: string;
};

export type userRegister = {
  username: string;
  password: string;
  info: {
    name: string;
    lastname: string;
    email: string;
    birthday: string;
    country: string;
  };
};

export type userLogin = {
  username: string;
  password: string;
};

export type userAuth = {
  id: string;
  username: string;
  createdAt:string;
  lastSession:string;
  info: {
    name: string;
    lastname: string;
    email: string;
    birthday: string;
    country: string;
  };
};
