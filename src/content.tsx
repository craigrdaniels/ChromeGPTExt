import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { type Component } from './components.types'
import './index.css'
import { Components } from './components'
import RenderComponent from './functions/RenderComponent'


Components?.map((component:Component, index:number) => {
  const root = document.createElement('div')
  root.id = component.id

  root.style.setProperty('position', 'absolute')
  root.style.setProperty('top', '0')
  root.style.setProperty('right', '20px')
  root.style.setProperty('padding', '0.5rem')
  root.style.setProperty('z-index', '999')

  const targetElement = document.getElementById(component.targetId)

  // @ts-expect-error - parentNode is not a property of null
  targetElement?.parentNode.style.setProperty('position', 'relative')
  targetElement?.parentNode?.insertBefore(root, targetElement.nextSibling)

  createRoot(root).render(
    <StrictMode key={index}>
      <RenderComponent {...component} />
    </StrictMode>
  )
})


