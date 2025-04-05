import MenuLateralEsquerdo from "@/components/MenuLateralEsquerdo";
import Logo from "@/components/Logo";
import DisplayMaps from "@/components/DisplayMaps";


export default function Perfil(){

    return(
        <div>
            <Logo color=""></Logo>
            <MenuLateralEsquerdo button_home={true} button_pefil_conograma_loja={true} button_config_fullScreen={true}/>
            <DisplayMaps></DisplayMaps>
        </div>
    )
}