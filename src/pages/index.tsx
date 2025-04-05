import { useState } from "react";
import MenuLateralEsquerdo from '../components/MenuLateralEsquerdo';
import Logo from "@/components/Logo";
import Link from "next/link";

async function addUser(setStatus) {
  try {
    const response = await fetch("../api/mysql_data/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        s_nome_cliente: "Thiago Alexandre Guerra",
        s_cpf_client: "10000000000",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus({ success: true, message: `Usuário adicionado: ${data.s_nome_cliente}` });
    } else {
      setStatus({ success: false, message: data.error || "Erro ao adicionar usuário" });
    }
  } catch (error) {
    setStatus({ success: false, message: "Erro na requisição" });
  }
}

export default function Home() {
  const [status, setStatus] = useState(null);

  return (
    <main>
      <Logo color=""></Logo>
      <MenuLateralEsquerdo button_home={false} button_pefil_conograma_loja={true} button_config_fullScreen={true}/>
      <Link href="/pages_for_api/Login">
        <button className="Button_login">LOGIN</button>
      </Link>
    </main>

  );
}
