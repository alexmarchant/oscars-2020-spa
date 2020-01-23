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

export interface MakeSelectionRes {
  makeSelection: Selection
}

export interface MakeSelectionVars {
  categoryId: number
  nomineeId: number
}

export interface GetCategoriesAndMySelectionsRes {
  categories: Category[]
  mySelections: Selection[]
}
