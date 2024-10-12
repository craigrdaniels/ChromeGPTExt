import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { type Component } from './components.types'
import './index.css'
import { Components } from './components'
import RenderComponent from './functions/RenderComponent'
import RenderFileInput from './functions/RenderFileInput'
import RenderTTS from './functions/RenderTTS'


Components?.map((component: Component, index: number) => {
  // get page url
  const url = window.location.href.split('/')


  if ((url[5] && url[5] === component.page) || url.slice(-2)[0] == 'tests') {
    const root = document.createElement('div')
    root.id = component.id

    root.classList.add('component')
    root.classList.add('noExport')


    const targetElement = document.getElementById(component.targetId)

    // @ts-expect-error - parentNode is not a property of null
    targetElement?.parentNode.style.setProperty('position', 'relative')
    targetElement?.parentNode?.insertBefore(root, targetElement.nextSibling)

    switch (component.type) {
<<<<<<< HEAD
=======
      case 'tts':
        root.classList.add('tts')
        createRoot(root).render(
          <StrictMode key={index}>
            <RenderTTS />
          </StrictMode>
        )
        break



      case 'prompt':
        createRoot(root).render(
          <StrictMode key={index}>
            <RenderComponent {...component} />
          </StrictMode>
        )
        break
>>>>>>> 866bfbe (init TTS support)

      case 'file':
        createRoot(root).render(
          <StrictMode key={index}>
            <RenderFileInput {...component} />
          </StrictMode>
        )
        break

        default:
          createRoot(root).render(
            <StrictMode key={index}>
            <RenderComponent {...component} />
            </StrictMode>
        )
        break
    }

  }
})


