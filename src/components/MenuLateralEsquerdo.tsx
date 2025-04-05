import Link from "next/link";
import ToggleFullScreen from "../../public/scripts_js/ToggleFullscreen";
import { useState } from "react";

interface MenuLateralEsquerdoProps {
  button_home: boolean;
  button_pefil_conograma_loja: boolean;
  button_config_fullScreen: boolean;
}

export default function MenuLateralEsquerdo({
  button_home,
  button_pefil_conograma_loja,
  button_config_fullScreen,
}: MenuLateralEsquerdoProps) {
  const [fullScreenState, setFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    ToggleFullScreen(fullScreenState);
    setFullScreen(!fullScreenState);
  };

  return (
    <nav className="box_lateral_de_navegacao">
      {button_home ? (
        <Link legacyBehavior href="/">
          <a className="icones_do_menu_de_navegacao">
            <div className="icone_img_home"></div>
          </a>
        </Link>
      ) : (
        <Link legacyBehavior href="/pages_for_api/ConsoleDeQuestoes">
          <a className="icones_do_menu_de_navegacao">
            <div className="icone_img_iniciar"></div>
          </a>
        </Link>
      )}

      {button_pefil_conograma_loja && (
        <>
          <Link legacyBehavior href="/pages_for_api/Perfil">
            <a className="icones_do_menu_de_navegacao icone_perfil_posicao">
              <div className="icone_img_perfil"></div>
            </a>
          </Link>

          <Link legacyBehavior href="/pages_for_api/Cronograma">
            <a className="icones_do_menu_de_navegacao icone_cronogrma_posicao">
              <div className="icone_img_cronograma"></div>
            </a>
          </Link>

          <Link legacyBehavior href="/pages_for_api/Loja">
            <a className="icones_do_menu_de_navegacao icone_loja_posicao">
              <div className="icone_img_loja"></div>
            </a>
          </Link>
        </>
      )}

      {button_config_fullScreen && (
        <>
          <div className="icones_do_menu_de_navegacao icone_cofiguracao_posicao">
            <div className="icone_img_configuracao"></div>
          </div>
          <button
            className="icones_do_menu_de_navegacao icone_5_posicao"
            onClick={handleToggleFullScreen}
            aria-label={
              fullScreenState
                ? "Sair do modo tela cheia"
                : "Entrar no modo tela cheia"
            }
          >
            <div className="icone_img_5"></div>
          </button>
        </>
      )}
    </nav>
  );
}
