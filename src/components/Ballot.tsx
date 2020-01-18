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

interface GetCategoriesAndMySelectionsRes {
  categories: Category[]
  mySelections: Selection[]
}

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

interface MakeSelectionResponse {
  makeSelection: Selection
}

interface MakeSelectionVars {
  categoryId: number
  nomineeId: number
}

// Update the cache manually after a selection
function makeSelectionCallback(
  cache: DataProxy,
  mutationResult: FetchResult<MakeSelectionResponse>,
): void {
  // Get the new selection from the makeSelection mutation
  const newSelection = mutationResult.data?.makeSelection
  if (!newSelection) {
    throw new Error('Bad result')
  }

  // Get the cache for the query we used on this page
  const queryRes = cache.readQuery<GetCategoriesAndMySelectionsRes>({
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
  })
  if (!queryRes) {
    throw new Error('Bad result')
  }

  const { categories, mySelections } = queryRes

  // Filter out selections with same cat id... can only select
  // one nominee from each cat, so we just remove old ones)
  const filteredSelections = mySelections.filter(selection => {
    return selection.categoryId !== newSelection.categoryId
  })

  // Add new selection
  const newMySelections = filteredSelections.concat([newSelection])

  // Save updated data to cache using writeQuery
  cache.writeQuery({
    query: GET_CATEGORIES_AND_MY_SELECTIONS,
    data: { categories, mySelections: newMySelections },
  })
}

const Ballot: React.FC = () => {
  const { loading, error, data } = useQuery<GetCategoriesAndMySelectionsRes>(
    GET_CATEGORIES_AND_MY_SELECTIONS,
  )
  const [makeSelection] = useMutation<MakeSelectionResponse, MakeSelectionVars>(
    MAKE_SELECTION,
    { update: makeSelectionCallback },
  )

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
