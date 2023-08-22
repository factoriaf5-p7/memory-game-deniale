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
        <Card data-testid="card" onClick={() => onCardClicked(index)}
          className="card col-md-10 mb-10"
          key={`${index}`}>
            <Card.Body>
              {/* <Card.Title>{game.name}</Card.Title>
              <Card.Text>Category: {game.category}</Card.Text> */}
              <Image
                src={url}
              >
              </Image>
            </Card.Body>
          </Card>
      </Row>
    </Container>
  );
