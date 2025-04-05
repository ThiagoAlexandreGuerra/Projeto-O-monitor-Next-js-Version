import { useState, useEffect } from "react";
import Global from "../../public/scripts_js/Global";


async function addUser(userName: string, userPassword: string, longitude: number) {
  try {
    const response = await fetch("/api/mysql_data/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        s_nome_cliente: userName,
        s_cpf_client: userPassword,
        localizacaUser: longitude,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar os dados");
    }

    const data = await response.json();
    console.log("Usuário adicionado com sucesso:", data);
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error.message);
  }
}
type ComponentAProps = {
  toggleComponent: () => void; // Define que toggleComponent é uma função sem parâmetros que retorna void
};

export default function LoginDisplay( { toggleComponent }:ComponentAProps ) {

  const [MostraCriarConta, SetMostrarCriarConta]=useState<boolean>(true);
    function ButtonBackToLogin(){

        const GetBoolValue=!Global.ShowCreatAcount;
        Global.ShowCreatAcount= GetBoolValue;
        SetMostrarCriarConta(GetBoolValue);
        console.log(GetBoolValue);
    }


  

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [location, setLocation] = useState<{ latitude: string; longitude: string } | null>(null);

    useEffect(() => {
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: String(position.coords.latitude),
              longitude:String( position.coords.longitude),
            });
          },
          (error) => {
            console.error("Erro ao obter localização:", error.message);
            setLocation(null);
          }
        );
      } else {
        console.log("Geolocation não é suportado neste navegador.");
      }
    }, []);

    const handleLogin = () => {
      if (!userName || !userPassword) {
        setErrorMessage("Por favor, preencha todos os campos.");
        return;
      }

      if (!location) {
        setErrorMessage("Não foi possível obter a localização. Tente novamente.");
        return;
      }

      setErrorMessage("");
      addUser(userName, userPassword, location.longitude);
    };

    return (
      <div className="box_forma_login">
        <h2 className="TitleLoginLogin">LOGIN</h2>
        <div className="inputs_posicao">
          <div className="Elemento">

            <label htmlFor="userName" className="LabelLogin">User Name:</label>
            <input
              id="userName"
              type="text"
              className="input_text"
              value={userName}
              onChange={(evt) => setUserName(evt.target.value)}
              />
          </div>
          <div className="Elemento">

            <label htmlFor="userPassword" className="LabelLogin">
              Password:
            </label>
            <input
              id="userPassword"
              type="password"
              className="input_password"
              value={userPassword}
              onChange={(evt) => setUserPassword(evt.target.value)}
            />
          </div>

        </div>

        {errorMessage && <p className="error_message">{errorMessage}</p>}

        <button className="button_entrar" onClick={handleLogin}>
          ENTRAR
        </button>
        <button 
          className="ButtonCreatACount"
          onClick={toggleComponent}
          >
          Criar perfil
        </button>

        <div className="mostrar_menu_lateral">
          <div className="icone_mostrar_seta_let_rigth"></div>
        </div>
      </div>
    );

}
