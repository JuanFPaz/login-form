const DEV_URL = 'http://localhost:3000'
// const PROD_URL = "https://jwt-prueba.onrender.com";
import type { UserRegister, UserLogin } from "../types/typeService";
import { optionsGET, optionsPOST } from "../utils/options";

async function api<T>(url: string, options: RequestInit): Promise<T> {
  const res: Response = await fetch(DEV_URL + url, options);
  
  if (!res.ok) {
    if (res.status === 404) {
      const err: any = await res.json();
      throw new Error(`${err.status} - ${err.message}`);
    }

    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json() as T;
}

async function post<T>(url: string, options: RequestInit) {
  return await api<T>(url, options);
}

export async function getUser<T>(url: string, access_token:string): Promise<T> {
  return await api<T>(url, optionsGET(access_token));
}

export async function postLogin<T>(url: string, body: UserLogin) {
  return await post<T>(url, optionsPOST(body));
}

export async function postSignUp<T>(url: string, body: UserRegister) {
  return await post<T>(url, optionsPOST(body));
}

export async function postLogut<T>(url: string): Promise<T> {
  return await post<T>(url, optionsPOST());
}

export async function postRefresh<T>(url:string): Promise<T>{
  return await post<T>(url,optionsPOST())
}
