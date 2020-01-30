import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES_AND_MY_SELECTIONS } from '../graphql/queries'

const Store = React.createContext()

const SelectionsProvider = props => {
  const dataObj = { mySelections: [] }
  console.log('0')

  // const data = 'we there'

  const { loading, error, data } = useQuery(GET_CATEGORIES_AND_MY_SELECTIONS)

  console.log('1')

  if (loading || !data)
    return <Store.Provider value={dataObj}>{props.children}</Store.Provider>

  if (error)
    return <Store.Provider value={dataObj}>{props.children}</Store.Provider>

  return <Store.Provider value={data}>{props.children}</Store.Provider>
}

const Child = () => {
  const hook = React.useContext(Store)
  return <div>{hook.text}</div>
}

export { SelectionsProvider, Store, Child }
