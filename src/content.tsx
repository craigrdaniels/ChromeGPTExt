import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AssessmentNotes from './functions/AssessmentNotes'
import COSINotes from './functions/COSINotes'
import GPReport from './functions/GPReport'
import './index.css'

const root = document.createElement('div')
root.id = 'my-ext'
root.style.setProperty('position', 'absolute')
root.style.setProperty('top', '0')
root.style.setProperty('right', '20px')
root.style.setProperty('padding', '0.5rem')
root.style.setProperty('z-index', '999')

const assessmentTextArea = document.getElementById('input-014aa')
// @ts-expect-error - parentNode is not a property of null
assessmentTextArea?.parentNode.style.setProperty('position', 'relative')
assessmentTextArea?.parentNode?.insertBefore(root, assessmentTextArea.nextSibling)

createRoot(root).render(
  <StrictMode>
    <AssessmentNotes />
  </StrictMode>,
)

const root2 = document.createElement('div')
root2.id = 'my-ext'
root2.style.setProperty('position', 'absolute')
root2.style.setProperty('top', '0')
root2.style.setProperty('right', '20px')
root2.style.setProperty('padding', '0.5rem')
root2.style.setProperty('z-index', '999')

const cosiTextArea = document.getElementById('input-014')
// @ts-expect-error - style is not a property of parentnode
cosiTextArea?.parentNode.style.setProperty('position', 'relative')
cosiTextArea?.parentNode?.insertBefore(root2, cosiTextArea.nextSibling)

createRoot(root2).render(
  <StrictMode>
    <COSINotes />
  </StrictMode>,
  )

const root3 = document.createElement('div')
root3.id = 'my-ext'
root3.style.setProperty('position', 'absolute')
root3.style.setProperty('top', '0')
root3.style.setProperty('right', '20px')
root3.style.setProperty('padding', '0.5rem')
root3.style.setProperty('z-index', '999')

const reportTextArea = document.getElementById('input-055-comments')
// @ts-expect-error - style is not a property of parentnode
reportTextArea?.parentNode.style.setProperty('position', 'relative')
reportTextArea?.parentNode?.insertBefore(root3, reportTextArea.nextSibling)

createRoot(root3).render(
  <StrictMode>
    <GPReport />
  </StrictMode>,
  )

