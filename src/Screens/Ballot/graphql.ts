import { gql } from '@apollo/client'

export const query = {
  GET_CATEGORIES_AND_MY_SELECTIONS: gql`
    query GetCategoriesAndMySelections {
      categories {
        id
        title
        value
        winnerId
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
  GET_CATEGORIES: gql`
    query GetCategories {
      categories {
        id
        title
        value
        winnerId
        nominees {
          id
          name
          film
        }
      }
    }
  `,
  CATEGORY_UPDATED: gql`
    subscription CategoryUpdated {
      categoryUpdated {
        id
        winnerId
      }
    }
  `
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
  SET_WINNER: gql`
    mutation PickWinner($categoryId: Int!, $nomineeId: Int) {
      setWinner(categoryId: $categoryId, nomineeId: $nomineeId) {
        id
        winnerId
      }
    }
  `,
}
