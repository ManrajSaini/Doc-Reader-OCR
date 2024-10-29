import { ChatOpenAI } from "@langchain/openai";

function combineContent(data: any) {
  let combinedContent = "";

  data.pages
    .sort((a: any, b: any) => a.page - b.page)
    .forEach((page: any) => {
      const cleanContent = page.content.replace(/```/g, "").trim();

      combinedContent += cleanContent + "\n\n";
    });

  return combinedContent.trim();
}

function convertToJSON(jsonString: string) {
  try {
    const cleanString = jsonString
      .replace(/```json\n/, "")
      .replace(/```/g, "")
      .trim();

    const jsonObject = JSON.parse(cleanString);

    return jsonObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export async function getStructuredData(data: any) {
  const model = new ChatOpenAI({ model: "gpt-4-turbo" });

  const prompt = {
    messages: [
      {
        role: "system",
        content:
          "You will be given a list of pages from a document, inside each page you will find the data field having markdown formatted text, you need to extract the data and return the structured data in json format, if you find any data to be not that important then you can add it under the extra-details field",
      },
      {
        role: "user",
        content: combineContent(data),
      },
    ],
  };

  const response = await model.invoke(prompt.messages);
  const jsonData = convertToJSON(JSON.stringify(response.content));

  return jsonData;
}
