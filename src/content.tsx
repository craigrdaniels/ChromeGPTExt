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
      case 'tts':
        root.classList.add('tts')
        createRoot(root).render(
            <RenderTTS key={index} />
        )
        break

      case 'prompt':
        createRoot(root).render(
            <RenderComponent {...component} key={index} />
        )
        break

      case 'file':
        createRoot(root).render(
            <RenderFileInput {...component} key={index} />
        )
        break

        default:
          createRoot(root).render(
            <RenderComponent {...component} key={index} />
        )
        break
    }

  }
})


