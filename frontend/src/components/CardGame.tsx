//animacion al darle click
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { shuffle } from '@vitest/utils';

interface Card {
  _id: string;
  name: string;
  url: string;
  category: string;
}

export const CardGame = () => {
  const [games, setGames] = useState<Card[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/game")
      .then((response) => {
        const fetchedGames = response.data;
        const duplicatedGames = [...fetchedGames, ...fetchedGames];
        const shuffledGames = shuffle(duplicatedGames);
        setGames(shuffledGames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h1>Game Cards</h1>
      <Row>
        {games.map((game) => (
          <div key={game._id} className="col-md-4 mb-4">
            <Card data-testid="card">
              <Card.Body>
                {/* <Card.Title>{game.name}</Card.Title>
                <Card.Text>Category: {game.category}</Card.Text> */}
                <Image
                  src={game.url}
                >
                </Image>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};
