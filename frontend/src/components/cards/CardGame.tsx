// import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
// import arrayShuffle from 'array-shuffle';


export type CardType = {
  index: number;
  id: string;
  name: string;
  url: string;
  category: string;
};

type CardProps = {
  card: CardType;
  onCardClicked: (index: number) => void;
};


export const CardGame =  ({
  card: { index, url = "" }, onCardClicked,}: CardProps) => (
    <Container className="mt-4">
      
      <Row>
        <Card data-testid="card-front" onClick={() => onCardClicked(index)}
          className="card col-md-10 mb-10"
          key={`${index}`}>
              <Image
                src={url}
              >
              </Image>
             
          </Card>
          <Card data-testid="card" onClick={() => onCardClicked(index)}
          className="card-back col-md-10 mb-8">
              <Image
                src="https://niltonnavarro.com/wp-content/uploads/2019/05/frases-superherores-motivacion-marca-personal-superacion-nilton-navarro-blog-que-es-la-marca-personal-1024x709.jpg.webp" height={'120px'}
              >
              </Image>
             
          </Card>
          
      </Row>
    </Container>
  );
