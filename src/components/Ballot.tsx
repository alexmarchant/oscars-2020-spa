import React from 'react'
import {
  useQuery,
  gql,
  useMutation,
  DataProxy,
  FetchResult,
} from '@apollo/client'

interface Category {
  id: number
  title: string
  value: number
  nominees: Nominee[]
}

interface Nominee {
  id: number
  name: string
  film: string
}

interface Selection {
  id: number
  userId: number
  categoryId: number
  nomineeId: number
}

const GET_CATEGORIES_AND_MY_SELECTIONS = gql`
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
`

const MAKE_SELECTION = gql`
  mutation MakeSelection($categoryId: Int!, $nomineeId: Int!) {
    makeSelection(categoryId: $categoryId, nomineeId: $nomineeId) {
      id
      userId
      categoryId
      nomineeId
    }
  }
`

interface QueryRes {
  categories: Category[]
  mySelections: Selection[]
}

// Update the cache manually after a selection
function makeSelectionCallback(
  cache: DataProxy,
  mutationResult: FetchResult<{ makeSelection: Selection }>,
): void {
  const newSelection = mutationResult.data?.makeSelection
  if (!newSelection) {
    throw new Error('Bad result')
  }
  const queryRes = cache.readQuery<QueryRes>({
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
  })
  if (!queryRes) {
    throw new Error('Bad result')
  }
  const { categories, mySelections } = queryRes
  const newMySelections = mySelections.concat([newSelection])
  cache.writeQuery({
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
    data: { categories, mySelections: newMySelections },
  })
}

const Ballot: React.FC = () => {
  const { loading, error, data } = useQuery<QueryRes>(
    GET_CATEGORIES_AND_MY_SELECTIONS,
  )
  const [makeSelection] = useMutation<
    { makeSelection: Selection },
    { categoryId: number; nomineeId: number }
  >(MAKE_SELECTION, { update: makeSelectionCallback })

  if (loading || !data) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  function isSelected(category: Category, nominee: Nominee): boolean {
    if (!data) return false
    return data.mySelections.some(
      selection =>
        selection.categoryId === category.id &&
        selection.nomineeId === nominee.id,
    )
  }

  return (
    <div>
      {data.categories.map(category => (
        <div>
          <div>
            {category.title} - {category.value}
          </div>
          <ul>
            {category.nominees.map(nominee => (
              <li
                style={{
                  backgroundColor: isSelected(category, nominee)
                    ? 'green'
                    : 'transparent',
                }}
              >
                {nominee.name} - {nominee.film}
                <button
                  onClick={() => {
                    makeSelection({
                      variables: {
                        categoryId: category.id,
                        nomineeId: nominee.id,
                      },
                    })
                  }}
                >
                  Pick
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Ballot
