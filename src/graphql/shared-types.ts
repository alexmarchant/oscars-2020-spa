export interface Nominee {
  id: number
  name: string
  film: string
}

export interface Category {
  id: number
  title: string
  value: number
  winnerId: number
  nominees: Nominee[]
}

export interface Selection {
  id: number
  userId: number
  categoryId: number
  nomineeId: number
}

export interface User {
  id: number
  name: string
  email: string
  admin: boolean
  createdAt: string
  updatedAt: string
  selections?: Selection[]
}
