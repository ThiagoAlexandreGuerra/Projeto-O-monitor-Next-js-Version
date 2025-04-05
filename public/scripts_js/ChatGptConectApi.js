const axios = require("axios");

export default async function chatGPT(question) {
  const API_KEY = "##########################################################";
  const url = "#######################################";

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: question },
    ],
    max_tokens: 150,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("Erro ao consumir a API:", error.response ? error.response.data : error.message);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
}


