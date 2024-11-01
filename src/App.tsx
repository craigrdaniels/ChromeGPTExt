import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {

  useEffect(() => {
    const root = document.createElement('div')

    createRoot(root).render(
      <>
      </>
    )
  }, [])

  return null
}

export default App
