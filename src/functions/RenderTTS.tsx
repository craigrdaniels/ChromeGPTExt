import { useEffect, useState, MouseEvent } from 'react'
import { useSpeechRecognition } from 'react-speech-kit'
import { createResponse } from './VertexAI'
import { MicOff, Mic, LoaderCircle } from 'lucide-react'

const RenderTTS = () => {

  const [finalTranscript, setFinalTranscript] = useState<string>('')
  const [targetTextArea, setTargetTextArea] = useState<HTMLTextAreaElement | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result)
    }
  })

  useEffect(() => {
    setFinalTranscript(finalTranscript + " " + value)
    if (targetTextArea) {
      targetTextArea.value = finalTranscript
    }
    console.log('Transcript: ', value)
  }, [value])

  useEffect(() => {
    console.log('Supported: ', supported)
  }, [supported])

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (listening) {
      stop()
      setTargetTextArea(null)
      // Transcribe the result
      if (finalTranscript !== '') {
        setLoading(true)
        const target = e.currentTarget
        const prevSibling = target.parentElement?.previousSibling
        console.log('Final transcript: ', finalTranscript)

        if (prevSibling && (prevSibling instanceof HTMLInputElement || prevSibling instanceof HTMLTextAreaElement)) {
          const prompt = `Please provide a summary of the client's case history, given the following discussion between audiologist and client: ${finalTranscript}`

          const result = await createResponse(prompt) || ""
          prevSibling.value = result
        }
      }
      setLoading(false)

      console.log('Stopped Listening')
    } else {
      setFinalTranscript('')

        const target = e.currentTarget
        const prevSibling = target.parentElement?.previousSibling
        if (prevSibling && (prevSibling instanceof HTMLTextAreaElement)) {
          setTargetTextArea(prevSibling)
        }
      listen({ interimResults: false, language: 'en-GB' })
      console.log('Listening...')
    }
  }


  return (
    <button onClick={handleClick}>
      {
        loading ? <LoaderCircle className='icon loading' /> : (
          listening ? <Mic className='icon' /> :
            <MicOff className='icon' />
        )
      }
    </button>
  )
}

export default RenderTTS
