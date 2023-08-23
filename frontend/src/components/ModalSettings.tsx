//dificultad, cambiar el tema(Call buttons/theme)
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ThemeSelector } from "./ThemeSelector";
import { ModalProps } from "react-bootstrap/Modal"; 

interface ModalSettingsProps extends ModalProps {
  onChangeTheme: (theme: string) => void;
}
export const ModalSettings = ({ onChangeTheme, show, onHide }: ModalSettingsProps) => {
  return (
    <Container data-testid="modal-settings">
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <ThemeSelector onChangeTheme={onChangeTheme} />
        </Modal.Body>
      </Modal>{" "}
    </Container>
  );
};
