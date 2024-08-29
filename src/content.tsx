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
root.style.setProperty('right', '0')
root.style.setProperty('padding', '0.5rem')

const assessmentTextArea = document.getElementById('id-009')
assessmentTextArea?.parentNode.style.setProperty('position', 'relative')
assessmentTextArea?.parentNode.insertBefore(root, assessmentTextArea.nextSibling)

createRoot(root).render(
  <StrictMode>
    <AssessmentNotes />
  </StrictMode>,
)

const root2 = document.createElement('div')
root2.id = 'my-ext'
root2.style.setProperty('position', 'absolute')
root2.style.setProperty('top', '0')
root2.style.setProperty('right', '0')
root2.style.setProperty('padding', '0.5rem')

const cosiTextArea = document.getElementById('id-011')
cosiTextArea?.parentNode.style.setProperty('position', 'relative')
cosiTextArea?.parentNode.insertBefore(root2, cosiTextArea.nextSibling)

createRoot(root2).render(
  <StrictMode>
    <COSINotes />
  </StrictMode>,
  )

const root3 = document.createElement('div')
root3.id = 'my-ext'
root3.style.setProperty('position', 'absolute')
root3.style.setProperty('top', '0')
root3.style.setProperty('right', '0')
root3.style.setProperty('padding', '0.5rem')

const reportTextArea = document.getElementById('id-012')
reportTextArea?.parentNode.style.setProperty('position', 'relative')
reportTextArea?.parentNode.insertBefore(root3, reportTextArea.nextSibling)

createRoot(root3).render(
  <StrictMode>
    <GPReport />
  </StrictMode>,
  )

