import chatGPT from "../../public/scripts_js/ChatGptConectApi";
import { useState } from "react";

interface ConsoleRespostaProps {
  acerto: boolean;
}

export default function ConsoleResposta(props: ConsoleRespostaProps) {
  const [pergunta, setPergunta] = useState<string>(""); // Inicializado como string vazia
  const [resposta, setResposta] = useState<string>("");

  async function searchInChatGpt(duvida: string) {
    try {
      const retorno = await chatGPT(duvida); 
      setResposta(retorno);
    } catch (error) {
      console.error("Erro ao chamar o chatGPT:", error);
      setResposta("Erro ao obter resposta. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="ContentBoxResposta">
      <div className="Itens">
        <label htmlFor="InputPergunta">Dúvida:</label>
        <input
          type="text"
          className="InputTextConsoleResposta"
          value={pergunta}
          onChange={(evt) => setPergunta(evt.target.value)}
        />
        <button onClick={() => searchInChatGpt(pergunta)}>
          Perguntar
        </button>
      </div>
      <div className="Itens">
        <div className="ContentRespostaViaChatGpt">
          <p>{resposta}</p>
        </div>
      </div>
    </div>
  );
}
