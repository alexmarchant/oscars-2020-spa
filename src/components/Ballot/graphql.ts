import { gql } from '@apollo/client'

export const query = {
  GET_CATEGORIES_AND_MY_SELECTIONS: gql`
    query GetCategoriesAndMySelections {
      categories {
        id
        title
        value
        nominees {
          id
          name
          film
        }
      }
      mySelections {
        id
        userId
        categoryId
        nomineeId
      }
    }
  `,
}
export const mutation = {
  MAKE_SELECTION: gql`
    mutation MakeSelection($categoryId: Int!, $nomineeId: Int!) {
      makeSelection(categoryId: $categoryId, nomineeId: $nomineeId) {
        id
        userId
        categoryId
        nomineeId
      }
    }
  `,
}