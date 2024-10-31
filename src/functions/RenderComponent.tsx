import { useState, MouseEvent } from 'react'
import { Sparkles, LoaderCircle } from 'lucide-react'
<<<<<<< HEAD
import { createResponse } from './OpenAI'
import { createRecommendation } from './OpenAIRecommendations'
=======
import { createResponse } from './VertexAI'
>>>>>>> gemini
import { type Component } from '../components.types'

const createMessage = (component: Component) => {
  let requestMessage = component.requestMessage

  if (component.useTargetInput && component.useTargetInput === true) {
    const targetElement = document.getElementById(component.targetId) as HTMLTextAreaElement
    requestMessage += `${targetElement.value}\n`
  }

  component.inputFields?.map((field) => {
    const targetElement = document.getElementById(field.id) as HTMLTextAreaElement
    requestMessage += `${field.name}: ${targetElement.value}\n`
  })

  return requestMessage
}

const RenderComponent = (component: Component) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)
    setIsError(false)
    try {

      const target = e.currentTarget
      const prevSibling = target.parentElement?.previousSibling

      if (prevSibling && (prevSibling instanceof HTMLInputElement || prevSibling instanceof HTMLTextAreaElement)) {
        const message = createMessage(component)

        if (!message) {
          prevSibling.placeholder = "Please enter your text"
          setLoading(false)
          return
        }


        let newMessage = ""

        if (component.type === 'recommendation') {
          newMessage = await createRecommendation({ input: message }) || ""
        } else {
          newMessage = await createResponse(message) || ""
        }


        prevSibling.value = newMessage
      } else {
        console.error('No previous sibling')
        setIsError(true)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setIsError(true)
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick}>
      {
        loading ? <LoaderCircle className='icon loading' /> :
          <Sparkles className={['icon', isError && 'error'].filter(Boolean).join(' ')}
          />
      }
    </button>
  )
}

export default RenderComponent
