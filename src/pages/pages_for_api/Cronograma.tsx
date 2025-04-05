import MenuLateralEsquerdo from "@/components/MenuLateralEsquerdo"
import Logo from "@/components/Logo"


export default function Cronograma(){

    return(
        <div>
            <MenuLateralEsquerdo button_home={true} button_pefil_conograma_loja={true} button_config_fullScreen={true}/>
            <Logo color=""></Logo>
        </div>
    )
}