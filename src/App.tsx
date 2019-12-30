import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App: React.FC = () => {
  return (
    <Container>
      <h1>Oscars 2020 SPA</h1>
    </Container>
  )
}

export default App
