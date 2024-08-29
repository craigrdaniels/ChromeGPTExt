import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { LoaderCircle } from 'lucide-react'
import { reWriteNotes } from './OpenAI'


const AssessmentNotes = () => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleClick = async (e: any) => {
    setLoading(true)
    setIsError(false)
    try {

      const target = e.currentTarget
      const prevSibling = target.parentElement?.previousSibling

      if (prevSibling && (prevSibling instanceof HTMLInputElement || prevSibling instanceof HTMLTextAreaElement)) {
        const message = prevSibling.value

        if (!message) {
          prevSibling.placeholder = "Please enter your text here first"
          setLoading(false)
          return
        }

        const newMessage = await reWriteNotes(message)

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
    loading ? <LoaderCircle className='h-6 w-6 text-blue-500 animate-spin' /> :
      <Sparkles className={['h-6 w-6 cursor-pointer', isError ? 'text-red-500' : 'text-blue-500'].filter(Boolean).join(' ')}
        onClick={handleClick}
      />
  )
}

export default AssessmentNotes
