import { useState,useEffect } from "react";
import Global from "../../public/scripts_js/Global";

type ComponentAProps = {
    toggleComponent: () => void; // Define que toggleComponent é uma função sem parâmetros que retorna void
  };

export default function CreatAcount({toggleComponent}:ComponentAProps) {

    
    const [resultado, setResultado] = useState(null);

    const buscarUsuario = async () => {
        console.log(userName)
        if (!userName) {
            console.error("Nome do usuário não foi definido.");
            return;
        }
           try {
            const res = await fetch(`/api/mysql_data/AddUserMensage?NomeUser=${encodeURIComponent(userName)}`);

               const data = await res.json();
               setResultado(data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
            console.log(resultado)

        };

    const handleLogin = () => {
        if (!userName || !userPassword) {
          setErrorMessage("Por favor, preencha todos os campos.");
          return;
        }
  
        if (!location) {
          setErrorMessage("Não foi possível obter a localização. Tente novamente.");
          return;
        }

        const ArmazenaHora=String(getCurrentDateTimeJson().hora);
        const ArmazenaDate=new Date().toISOString().split("T")[0];
        setErrorMessage("");
        addUser(userName,
             userPassword, 
             UserEmail , 
             location.latitude , 
             location.longitude, 
             ArmazenaDate, 
             ArmazenaHora , 
             selectedBanco);
        console.log("espera um minuto")
        setTimeout(buscarUsuario,30000)     
      };
  

    async function addUser(
        userName: string,
        userPassword: string,
        UserEmail:string, 
        latitude:number, 
        longitude: number, 
        datat:string , 
        hora:string , 
        concursoS:string) {
            try {
            const response = await fetch("/api/mysql_data/add_user", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    s_nome_user:userName,
                    email_user: UserEmail ,
                    senha_user: userPassword ,
                    position_latitude: latitude ,
                    position_longitude: longitude,
                    concurso:concursoS,
                    primeiro_login_date: datat,
                    primeiro_login_hour: hora
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

    function getCurrentDateTimeJson() {
        const now = new Date();
        const date = now.toLocaleDateString("pt-BR"); // Data no formato DD/MM/AAAA
        const time = now.toLocaleTimeString("pt-BR"); // Hora no formato HH:MM:SS
        
        return {
            data: date,
            hora: time
        };
    }

    const ObjetoTest = [
        { Banco: "Banco do Brasil" },
        { Banco: "Banco da Amazonia" },
        { Banco: "Caixa Federal" },
        { Banco: "BNB" },
        { Banco: "Baneste" },
        { Banco: "Banrisul" },
        { Banco: "Banpara" },
    ];

    const [AbreMenu, SetAbreMenu] = useState<boolean>();
    const [ManipulaIcon, SetManipulaIcon] = useState<string>("ButtonDivImitaSelect");
    const [LineStyle, SetLineStyle] = useState<string>("LineStylesDesingRigth");
    const [DisplayOptions , SetDisplayOptions]= useState<string>("ContentShowOptionscurses");
    const [userName, setUserName] = useState<string>();
    const [userPassword, setUserPassword] = useState<string>();
    const [errorMessage, setErrorMessage] = useState("");
    const [UserEmail, SetUserEmail] = useState<string>("");
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [selectedBanco, setSelectedBanco] = useState<string>("");


    function AbreMenuManipula() {
        SetAbreMenu(true);
        SetManipulaIcon(ClassButtonDivImitaSelectOpen);
        SetLineStyle(ClassLineStylesDesingRigthOpen);
        SetDisplayOptions(ClassContentShowOptionscursesOpen);
    }
    function FechaMenuManipula() {
        SetAbreMenu(false);
        SetManipulaIcon(ClassButtonDivImitaSelect);
        SetLineStyle(ClassLineStylesDesingRigth);
        SetDisplayOptions(ClassContentShowOptionscurses);

    }

    let cont = 0;

    function ManipulaMenu() {
        if (cont % 2 === 0) {
            AbreMenuManipula();
        } else {
            FechaMenuManipula();
        }
        ++cont;
    }

    const ClassButtonDivImitaSelect = "ButtonDivImitaSelect";
    const ClassButtonDivImitaSelectOpen = "ButtonDivImitaSelectOpen";
    const ClassLineStylesDesingRigth = "LineStylesDesingRigth";
    const ClassLineStylesDesingRigthOpen = "LineStylesDesingRigthOpen";
    const ClassContentShowOptionscurses="ContentShowOptionscurses";
    const ClassContentShowOptionscursesOpen="ContentShowOptionscursesOpen";

    useEffect(() => {
        if (typeof navigator !== "undefined" && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude:position.coords.longitude,
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

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBanco(e.target.value); // Atualiza o estado com o valor selecionado
    };

    
    
        return (
            <>
                <div className="ContentCreatAcount">
                    <div className="ContentButtonBackTitle">
                        <button 
                            className="ButtonBackArrow"
                            onClick={toggleComponent}
                            >.</button>
                        <h1 className="TitleContentCreatAcount">Criar Conta</h1>
                    </div>

                    <div className="ContentInputs">
                        <div className="ElementoContentCreatAcount">
                            <label htmlFor="UserName" className="LabelCreatAcount">Nome :</label>
                            <input 
                                type="text" 
                                className="InputCreatAcount" 
                                value={userName} 
                                onChange={(evt)=>{setUserName(evt.target.value)}} 
                            />
                        </div>
                        <div className="ElementoContentCreatAcount">
                            <label htmlFor="UserEmail" className="LabelCreatAcount">Email :</label>
                            <input 
                                type="text" 
                                className="InputCreatAcount" 
                                value={UserEmail}
                                onChange={(evt)=>{SetUserEmail(evt.target.value)}}
                            />
                        </div>
                        <div className="ElementoContentCreatAcount">
                            <label htmlFor="UserPassWord" className="LabelCreatAcount">Senha :</label>
                            <input 
                                type="password" 
                                className="InputCreatAcount SenhaLengthInput" 
                                value={userPassword}
                                onChange={(evt)=>{setUserPassword(evt.target.value)}}
                            />
                        </div>
                        <div className="ElementoContentCreatAcount">
                            <label htmlFor="ConfirmPassword" className="LabelCreatAcount">Confirme senha :</label>
                            <input type="password" className="InputCreatAcount ConfirmeSenhaLengthInput" />
                        </div>
                    </div>
                    <button 
                        className="BottonDoneCreatAcount"
                        onClick={()=>{handleLogin()}}
                        >
                        Criar Conta
                    </button>
                    <div className={LineStyle}></div>

                    <div className={DisplayOptions}>
                        {ObjetoTest.map((item, index) => (
                            <div key={index}>
                                <input
                                    id={item.Banco}
                                    value={item.Banco}
                                    type="radio"
                                    name="options"
                                    onChange={handleRadioChange} // Evento para capturar o valor
                                />
                                <label htmlFor={item.Banco}>{item.Banco}</label>
                            </div>
                        ))}
                    </div>

                    <div className="ContentSelectCurseCreatAcount">
                        <button className={ManipulaIcon} onClick={() => ManipulaMenu()}>
                        </button>
                        <div className="DivImitaSelect">Concurso</div>
                    </div>
                </div>
            </>
        );
        
    }

