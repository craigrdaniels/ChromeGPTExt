import { VertexAI } from '@google-cloud/vertexai'
import * as credentials from '../../dmt-hack-team07-hk-prj-d326-5d386fcf42d3.json' assert { type: "json" }

const GCP_PROJECT_ID = credentials.project_id
const GCP_LOCATION = "us-west1"
const TEXT_MODEL = "gemini-1.5-pro"

const authOptions = {
  credentials: credentials,
}

const AI_ROLE = "You are an audiologist's assistant. Your role is to help rewrite case history notes, create COSI goals and help write GP reports from given client's information. You should answer as clear and concise as possible, with no filler. Answer in plaintext only and avoid using markdown or bolding and other formatting. You don't need to add information about what is a COSI goal, etc"

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

export const createResponse = async (input: string) => {

  try {
    const request = {
      contents: [{ role: 'user', parts: [{ text: input }] }]
    }

    const result = await generativeModel.generateContent(request)

    const text = result.response

    if (!text || !text.candidates || text.candidates.length === 0) {
      throw new Error("No response found")
    }

    return text.candidates[0].content.parts[0].text

  } catch (error) {
    reportError({ message: getErrorMessage(error) });
  }
}
