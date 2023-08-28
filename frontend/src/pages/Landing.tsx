//despues de la animación pedir name y avatar, button start
import {PrimaryButton} from "../components/buttons/PrimaryButton"
import { Container, Row, Col, Button} from "react-bootstrap"
import { UserForm } from "../components/UserForm";
import { Link } from "react-router-dom";
import { HeroImage } from "../components/HeroImage";

export const Landing= () => {
  return (
    <Container>
      <Row style={{ margin: "10rem auto" }}>
        <Col
          xs={12}
          md={6}
          className="mb-5 mb-md-0 d-flex flex-column align-items-center justify-content-center"
        >
          <div data-testid="form">
            <UserForm />
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Link to="/game">
            <Button className="button pulsate">Go to Game</Button>
          </Link>
        </Col>
      </Row>
      <HeroImage />
    </Container>
  );
};