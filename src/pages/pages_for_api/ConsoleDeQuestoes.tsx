import MenuLateralEsquerdo from "@/components/MenuLateralEsquerdo"
import Logo from "@/components/Logo"
import ConsoleResposta from "@/components/ConsoleResposta"


export default function ConsoleDeQuestoes(){

    return(
        <div>
            <Logo color=""></Logo>
            <MenuLateralEsquerdo button_home={true} button_pefil_conograma_loja={true} button_config_fullScreen={true}/>
            <ConsoleResposta acerto={true}></ConsoleResposta>
        </div>
    )
}