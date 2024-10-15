import { JSONLoader } from 'langchain/document_loaders/fs/json'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import { StringOutputParser, JsonOutputParser } from '@langchain/core/output_parsers'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import * as lifestyleguide from '../data/lifestyleguide.json'


const OPENAI_API_KEY = "import.meta.env.VITE_OPENAI_API_KEY"

const loader = new JSONLoader('../data/lifestyleguide.json')

const OPENAI_ROLE = "You are an audiologist's assistant. Your role is to make a hearing aid recommendation by matching hearing aid technology to client COSI goals and lifestyle\n\n{context}"


export const extract_keywords = async ({ text }: { text: string }) => {

  const keywords = [
    "Conversation in quiet",
    "TV",
    "Conversation in a quiet cafe",
    "Conversation in a small group",
    "Restaurant",
    "Conversation in noise",
    "Crowds/Social Events",
    "Party",
    "Conversation in loud noise",
    "Theatre/Live Music"
  ]

  const prompt = `Extract a comma-seperated list of keywords related to all the listening environments from the text. Choose from the following keywords:\n${keywords.join(", ")}\n\nText:\n${text}`

  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    model: 'gpt-4o',
    temperature: 1
  })

  const parser = new StringOutputParser()

  const result = await model.invoke(prompt)
    .then((res) => {
      return parser.invoke(res)
    })

  return result
}

export const retreive_technologyLevel = async ({ listening_environments }: { listening_environments: string }) => {

  const prompt = `Here are different hearing aid technology levels and their corresponding listening environments:\n\n${JSON.stringify(lifestyleguide)}\n\nThe user has the following listening environments:\n${listening_environments}\n\nBased on the above data, what is the best technology level for this user?`

  const messages = [
    new SystemMessage(OPENAI_ROLE),
    new HumanMessage(prompt)
  ]

  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY,
    model: 'gpt-4o',
    temperature: 0.7,
  })

  const parser = new StringOutputParser()

  const result = await model.invoke(messages)
    .then((res) => {
      return parser.invoke(res)
    })

  return result
}



const getErrorMessage = (e: unknown) => {
  if (e instanceof Error) {
    return e.message;
  }
  return "An error occurred";
}

const reportError = ({ message }: { message: string }) => {
  // Log the error
  console.error(message);
}

export const createRecommendation = async ({input}: {input: string}) => {

  //console.log(input)

  const recommendedTechnology = extract_keywords({ text: input }).then((res) => retreive_technologyLevel({ listening_environments: res }))

  return recommendedTechnology
}
