type InputFields = {
  id: string
  name: string
}

export type Component = {
  id: string,
<<<<<<< HEAD
  type: 'prompt' | 'file' | 'recommendation',
=======
  type: 'prompt' | 'file' | 'tts',
>>>>>>> 866bfbe (init TTS support)
  page: string,
  name: string,
  targetId: string,
  useTargetInput?: boolean,
  requestMessage?: string,
  tooltip?: string,
  inputFields?: InputFields[]
}
