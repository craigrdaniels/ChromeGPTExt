import { VertexAI } from '@google-cloud/vertexai'
import * as credentials from '../../dmt-hack-team07-hk-prj-d326-5d386fcf42d3.json' assert { type: "json" }
import * as lifestyleguide from '../data/lifestyleguide.json'

const GCP_PROJECT_ID = credentials.project_id
const GCP_LOCATION = "us-west1"
const TEXT_MODEL = "gemini-1.5-pro"

const authOptions = {
  credentials: credentials,
}

const AI_ROLE = "You are an audiologist's assistant. Your role is to make a hearing aid recommendation by matching hearing aid technology to client COSI goals and lifestyle\n\n{context}"

const vertexAI = new VertexAI({ project: GCP_PROJECT_ID, location: GCP_LOCATION, googleAuthOptions: authOptions })

const generativeModel = vertexAI.getGenerativeModel({
  model: TEXT_MODEL,
  systemInstruction: {
    role: 'system',
    parts: [{ "text": AI_ROLE }]
  }
})

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

  try {
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    }

    const result = await generativeModel.generateContent(request)

    const text = result.response

    if (!text || !text.candidates || text.candidates.length === 0) {
      throw new Error("No response found")
    }

    return text.candidates[0].content.parts[0].text


  } catch (error) {
    reportError({
      message: getErrorMessage(error)
    });
  }
}

export const retreive_technologyLevel = async ({ listening_environments }: { listening_environments: string }) => {

  const prompt = `Here are different hearing aid technology levels and their corresponding listening environments:\n\n${JSON.stringify(lifestyleguide)}\n\nThe user has the following listening environments:\n${listening_environments}\n\nBased on the above data, what is the best technology level for this user?`

  try {

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    }

    const result = await generativeModel.generateContent(request)

    const text = result.response

    if (!text || !text.candidates || text.candidates.length === 0) {
      throw new Error("No response found")
    }

    return text.candidates[0].content.parts[0].text


  } catch (error) {
    reportError({
      message: getErrorMessage(error)
    });
  }
}


export const createRecommendation = async ({ input }: { input: string }) => {

  try {

    const recommendedTechnology = extract_keywords({ text: input }).then((res) => retreive_technologyLevel({ listening_environments: res || '' }))

    return recommendedTechnology
  } catch (error) {
    reportError({
      message: getErrorMessage(error)
    });
  }
}
