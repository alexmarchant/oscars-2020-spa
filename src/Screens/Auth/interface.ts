import { Dispatch, SetStateAction } from 'react'

export interface FormData {
  name: string
  email: string
  password: string
}

export enum Mode {
  Login,
  Signup,
}

export interface Props {
  setToken: Dispatch<SetStateAction<string | null | undefined>>
}

export interface LoginRes {
  login: string
}

export interface LoginVars {
  email: string
  password: string
}

export interface SignupRes {
  signup: string
}

export interface SignupVars {
  name: string
  email: string
  password: string
}
