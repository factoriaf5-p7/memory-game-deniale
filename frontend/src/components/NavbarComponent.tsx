//restart, puntuacion sesion actual, modal avatar(la informacion del perfil (puntuacion general, partidas jugadas, nombre)), modal settings

import  Container  from "react-bootstrap/Container";
import { ModalSettings } from "./ModalSettings";
import { useCardGameLogic } from "../hooks/useCardGameLogic";
import {Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button"; 
import { useState } from "react";

export const NavbarComponent = () => {
  const { resetGame } = useCardGameLogic();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('superhero'); 

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    resetGame(theme); // Pass the selected theme to reset the game
    closeSettingsModal(); // Close the modal after selecting a theme
  };

  return (
    <Navbar>
      <Container data-testid="navbar">
        <Button onClick={openSettingsModal}>Open Settings</Button>
        <ModalSettings
          onChangeTheme={handleThemeChange}
          show={showSettingsModal}
          onHide={closeSettingsModal}
        />
      </Container>{" "}
    </Navbar>
  );
};