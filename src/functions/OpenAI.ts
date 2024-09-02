import OpenAI from "openai";

const OPENAI_API_KEY="import.meta.env.VITE_OPENAI_API_KEY"

const OPENAI_ROLE="You are an audiologist's assistant. Your role is to help rewrite case history notes, create COSI goals and help write GP reports from given client's information. You should answer as clear and concise as possible. Answer in plaintext only and avoid using markdown or bolding and other formatting. You don't need to add information about what is a COSI goal, etc"

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


export const writeCOSI = async (text: string) => {

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              text: OPENAI_ROLE,
              type: "text",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              text: `Please write a few COSI goals given the following case history, just answer with COSI goals, no filler: ${text}`,
              type: "text",
            },
          ],
        },
      ],
      temperature: 0.9,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    }).then((res:OpenAI.ChatCompletion ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
  }
}

export const writeReport = async (text: string) => {

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              text: OPENAI_ROLE,
              type: "text",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              text: `Please write a brief GP report with relevant case history, the following results and recommenations for hearing aids or referral if required, no filler and plaintext only, no markdown or formatting or asterix: ${text}`,
              type: "text",
            },
          ],
        },
      ],
      temperature: 0.9,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    }).then((res: OpenAI.ChatCompletion ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (e) {
    reportError({ message: getErrorMessage(e) });
  }
}
export const reWriteNotes = async (text: string) => {

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              text: OPENAI_ROLE,
              type: "text",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              text: `Please rewrite the following client case history notes, just provide rewritten notes, no filler: ${text}`,
              type: "text",
            },
          ],
        },
      ],
      temperature: 0.9,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "text",
      },
    }).then((res:OpenAI.ChatCompletion ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (e) {
    reportError({ message: getErrorMessage(e) });
  }
}
