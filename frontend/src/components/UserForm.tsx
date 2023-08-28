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
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
  
    useEffect(() => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setName(storedName);
        setIsNameSaved(true);
      }
    }, []);
  
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
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    useEffect(() => {
      if (selectedImage) {
        localStorage.setItem("userImage", selectedImage);
      }
    }, [selectedImage]);
  
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
          <div className="user-form-box p-3" style={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name" className="styled-label">
                  Name:
                </Form.Label>
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
                  className="styled-input"
                />
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Label htmlFor="uploadImage">Upload Image:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  id="uploadImage"
                  onChange={handleImageUpload}
                  className="styled-input"
                  alt="uploaded"
                />
              </Form.Group>
    
              {selectedImage && (
                <div className="image-container mb-3">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="img-fluid rounded-circle"
                    style={{ width: "6rem", height: "6rem" }}
                  />
                </div>
              )}
    
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit" disabled={isNameSaved} className="styled-button">
                  Submit
                </Button>
              </div>
    
              {showAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  dismissible
                  className="mt-3"
                >
                  {alertMessage}
                </Alert>
              )}
            </Form>
          </div>
        </Container>
      );
    }; 