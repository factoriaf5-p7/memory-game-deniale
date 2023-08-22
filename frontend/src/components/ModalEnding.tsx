import { Player } from '@lottiefiles/react-lottie-player';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ModalEndingProps {
    show: boolean;
    onClose: () => void;
  }

export const ModalEnding = ({ show, onClose }:ModalEndingProps)=> {

        return (
          <Modal show={show} onHide={onClose} centered>
            <Modal.Body>
            <h5 className="text-center mt-3">Congratulations, you win!</h5>
              <Player
                loop
                autoplay
                className="player"
                controls
                style={{ width: '20rem', height: '20rem' }} 
                src="https://lottie.host/b649bbc9-288c-413a-af72-e69d4a5f1f60/aDSHteMZJf.json" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        );
      };
      
