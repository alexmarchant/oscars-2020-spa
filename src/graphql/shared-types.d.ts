export interface Category {
  id: number
  title: string
  value: number
  winnerId: number
  nominees: Nominee[]
}

export interface Nominee {
  id: number
  name: string
  film: string
}

export interface Selection {
  id: number
  userId: number
  categoryId: number
  nomineeId: number
}
