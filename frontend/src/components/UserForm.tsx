import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export interface UserData {
  name: string;
}

export const UserForm = () => {
  const [name, setName] = useState("");
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Changed from showToast
  const [alertMessage, setAlertMessage] = useState(""); // To store the error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/user",
        { name }
      );

      if (response.status === 201) {
        const userData = response.data;
        localStorage.setItem("userName", userData.name);
        setIsNameSaved(true);
        setName("");
      }
    } catch (error: any) {
      setAlertMessage(
        "This name already exists. Please choose a different name."
      );
      setShowAlert(true);
    }
  };
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowAlert(false);
            }}
            required
            disabled={isNameSaved}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
      </Form>
    </Container>
  );
};
