import { useState, ChangeEvent } from 'react'
import { type Component } from '../components.types'
import { createResponse } from './OpenAI'
import { CloudUpload, LoaderCircle } from 'lucide-react'

import ReadXMLData, { type JSONData } from './ReadXMLData'

const createMessage = (component: Component, jsonData: JSONData) => {
  let requestMessage = component.requestMessage

  requestMessage += `${JSON.stringify(jsonData, null, 2)}\n`

  console.log(requestMessage)

  return requestMessage
}

const RenderFileInput = (component: Component) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)


  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {

    try {
      const target = e.currentTarget
      const file = e.target.files ? e.target.files[0] : null

      if (file) {
        e.preventDefault()
        setLoading(true)
        setIsError(false)

        const prevSibling = target.parentElement?.parentElement?.previousSibling


        if (file.size > 1024 * 1024) {
          throw new Error('File size too large')
        }
        if (prevSibling && (prevSibling instanceof HTMLInputElement || prevSibling instanceof HTMLTextAreaElement)) {

          const reader = new FileReader()


          reader.onload = async (e) => {
            try {
              const jsonData: JSONData = ReadXMLData(e.target?.result as string || '')
              const message = createMessage(component, jsonData)
              const newMessage = await createResponse(message)
              prevSibling.value = newMessage || ''
            } catch (error) {
              console.error(error)
            } finally {
              setLoading(false)
            }
          }

          reader.readAsText(file)
        } else (console.error("PrevSibling Error"))
      }

    } catch (error) {
      console.error(error)
      setIsError(true)
      setLoading(false)
    }

  }

  return (
    <form>
      <label htmlFor="fileUpload">
        {loading ?
          <LoaderCircle className='icon loading' /> :
          <CloudUpload className={['icon', isError && 'error'].filter(Boolean).join(' ')} />
        }
      </label>
      <input type="file" id="fileUpload" accept=".xml" onChange={handleFileUpload} hidden />
    </form>
  )

}

export default RenderFileInput
