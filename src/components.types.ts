type InputFields = {
  id: string
  name: string
}

export type Component = {
  id: string,
  name: string,
  targetId: string,
  useTargetInput?: boolean,
  requestMessage: string,
  tooltip?: string,
  inputFields?: InputFields[]
}
