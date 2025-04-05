import MenuLateralEsquerdo from "@/components/MenuLateralEsquerdo";
import LoginDisplay from "@/components/LoginDisplay";
import Logo from "@/components/Logo";
import CreatAcount from "@/components/CreatAcount";
import Global from '../../../public/scripts_js/Global';
import {  useEffect, useState } from "react";

export default function Login(){
    const [visibleComponent, setVisibleComponent] = useState<'A' | 'B'>('A');

   console.log(visibleComponent);
    return(
        <main className="backgroundLogin">
            <Logo color="black"></Logo>
            <MenuLateralEsquerdo button_home={true} button_pefil_conograma_loja={false} button_config_fullScreen={true}/>
            {
                visibleComponent==='A'&&(

                    <LoginDisplay toggleComponent={()=>setVisibleComponent('B')} />
                )
            }
            {
                visibleComponent==='B'&&(

                    <CreatAcount toggleComponent={()=>setVisibleComponent('A')}/>
                )
            }
        </main>
    )
}