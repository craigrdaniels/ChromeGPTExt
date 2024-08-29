import OpenAI from "openai";


export const writeCOSI = async (text: string) => {

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
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
              text: import.meta.env.OPENAI_ROLE || "",
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
    }).then((res:any ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (e) {
    return `Error: ${e.message}`;
  }
}

export const writeReport = async (text: string) => {

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
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
              text: import.meta.env.OPENAI_ROLE || "",
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
    }).then((res:any ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (e) {
    return `Error: ${e.message}`;
  }
}
export const reWriteNotes = async (text: string) => {

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
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
              text: import.meta.env.OPENAI_ROLE || "",
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
    }).then((res:any ) => {
      return res.choices[0].message;
    })
    return gptResponse.content
  } catch (e) {
    return `Error: ${e.message}`;
  }
}
