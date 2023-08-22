//animacion al darle click
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { PrimaryButton } from "./buttons/PrimaryButton";

interface Card {
  _id: string;
  name: string;
  url: string;
  category: string;
}


export const CardGame = () => {
  const [games, setGames] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/game")
      .then((response) => {
        const fetchedGames = response.data;
        
      const shuffledGames = () => {
        const duplicatedGames = [...fetchedGames, ...fetchedGames]
          .sort(( ) => Math.random() - 0.5)
          .map((game)=>({ ...game, idUnique: Math.random()}));

          setGames(duplicatedGames);
          setTurns(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(games,turns)

  return (
    <Container className="mt-4">
      <h1>Game Cards</h1>
      <PrimaryButton> Start</PrimaryButton>
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
