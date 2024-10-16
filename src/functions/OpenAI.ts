import { ChatOpenAI } from '@langchain/openai'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'


const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY

const OPENAI_ROLE="You are an audiologist's assistant. Your role is to help rewrite case history notes, create COSI goals and help write GP reports from given client's information. You should answer as clear and concise as possible, with no filler. Answer in plaintext only and avoid using markdown or bolding and other formatting. You don't need to add information about what is a COSI goal, etc"

const getErrorMessage = (e: unknown) => {
  if (e instanceof Error) {
    return e.message;
  }
  return "An error occurred";
}

const reportError = ({ message }: {message: string}) => {
  // Log the error
  console.error(message);
}

export const createResponse = async (input: string) => {

  const messages = [
    new SystemMessage(OPENAI_ROLE),
    new HumanMessage(input)
  ]

  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    model: 'gpt-4o',
    temperature: 0.8
  })

  const parser = new StringOutputParser()

  try {
    const result = await model.invoke(messages)
    .then((res) => {
      return parser.invoke(res)
    })
    return result
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
  }
}
