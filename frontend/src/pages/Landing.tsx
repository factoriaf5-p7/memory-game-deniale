//despues de la animación pedir name y avatar, button start
import {PrimaryButton} from "../components/buttons/PrimaryButton"
import { Container} from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { UserForm } from "../components/UserForm";
import { Link } from "react-router-dom";

export const Landing= () => {
  return (
    <Container>
     <Form action="" data-testid="form"></Form>
      <UserForm />
      <Link to="/game"> 
        <PrimaryButton>Go to Game</PrimaryButton>
      </Link>
    </Container>
  )
}
