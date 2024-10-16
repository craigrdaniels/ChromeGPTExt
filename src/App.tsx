import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {

  useEffect(() => {
    const root = document.createElement('div')

    createRoot(root).render(
      <StrictMode>
      </StrictMode>
    )
  }, [])

  return null
}

export default App
