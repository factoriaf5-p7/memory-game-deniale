//despues de la animación pedir name y avatar, button start
import {PrimaryButton} from "../components/buttons/PrimaryButton"
import { Container} from "react-bootstrap"
import Form from 'react-bootstrap/Form';

export const Landing= () => {
  return (
    <Container>
     <Form action="" data-testid="form"></Form>
      
      <PrimaryButton/>
    </Container>
  )
}
