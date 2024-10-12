import { useEffect, MouseEvent } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { MicOff, Mic } from 'lucide-react'

const RenderTTS = () => {

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening
  } = useSpeechRecognition()

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result: ', finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition) {
    console.log('You browser does not support speech recognition')
    return null
  }

  const listenContinuously = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault()

    const target = e.currentTarget
    const prevSibling = target.parentElement?.parentElement?.previousSibling

    if (prevSibling && (prevSibling instanceof HTMLInputElement || prevSibling instanceof HTMLTextAreaElement)) {
      prevSibling.value = transcript
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB'
    })
  }




  return (
    <button>
      {
        listening ? <Mic className='icon' onClick={listenContinuously}/> :
          <MicOff className='icon' onClick={SpeechRecognition.stopListening}/>
      }
    </button>
  )
}

export default RenderTTS
