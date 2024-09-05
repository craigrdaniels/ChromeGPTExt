import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {

  useEffect(() => {
    const root = document.createElement('div')
    root.id = 'my-ext'

    const assessmentTextArea = document.getElementById('input-014aa')
    // @ts-expect-error - parentNode is not a property of null
    assessmentTextArea?.parentNode.classList.add('relative')
    assessmentTextArea?.parentElement?.insertBefore(root, assessmentTextArea.nextSibling)

    createRoot(root).render(
      <StrictMode>
      </StrictMode>
    )
  }, [])

  return null
}

export default App
