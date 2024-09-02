import { MouseEvent, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { LoaderCircle } from 'lucide-react'
import { writeReport } from './OpenAI'


const GPReport = () => {
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
        const caseHistoryElement = document.getElementById('input-014aa') as HTMLTextAreaElement
        const resultsElement = document.getElementById('input-0037') as HTMLTextAreaElement
        let message = `Case history: ${caseHistoryElement.value}`
        message += `Results: ${resultsElement.value}`

        if (!message) {
          prevSibling.placeholder = "Please enter your text here first"
          setLoading(false)
          return
        }

        const newMessage = await writeReport(message)

        prevSibling.value = newMessage || ''
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
    loading ? <LoaderCircle className='h-6 w-6 text-orange-500 animate-spin' /> :
      <Sparkles className={['h-6 w-6 cursor-pointer', isError ? 'text-red-500' : 'text-orange-500'].filter(Boolean).join(' ')}
      />
    }
    </button>
  )
}

export default GPReport
