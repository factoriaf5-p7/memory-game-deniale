//restart, puntuacion sesion actual, modal avatar(la informacion del perfil (puntuacion general, partidas jugadas, nombre)), modal settings

import { Col, Container, Navbar, Row } from 'react-bootstrap'

export const NavbarComponent = () => {

  
  const storedUserName = localStorage.getItem('userName');
  const storedUserImage = localStorage.getItem('userImage');

  return (
    <Navbar data-testid="navbar" style={({paddingTop: "0rem"})} >
    <Container fluid className="p-3" style={{ backgroundColor: 'var(--bs-info)' }}>
    <Row className="align-items-center">
      <Col xs={12} className="text-start ms-4">
        <div className="d-flex align-items-center">
          {storedUserImage && (
            <div className="image-container me-2">
              <img
                src={storedUserImage}
                alt="User"
                className="img-fluid rounded-circle"
                style={{ width: "3rem", height: "3rem" }}
              />
            </div>
          )}
          <div><p>{storedUserName}</p></div>
        </div>
      </Col>
    </Row>
  </Container>
  </Navbar>
    );
  };

