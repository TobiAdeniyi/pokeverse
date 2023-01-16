import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function PokemonCard({ url, name }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error(error));
  }, [url]);

  return (
    <div>
      <Card style={{ width: '18rem' }} className="mx-auto sm">
        <Card.Img
          bg="dark"
          width="286"
          height="286"
          variant="top"
          text="white"
          src={pokemonData?.sprites.front_default} />
        <Card.Body >
          <Card.Title className="h1">{name.toUpperCase()}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{pokemonData?.species.name}</Card.Subtitle>
          <Card.Text as="div">
            <h2>Abilities:</h2>
            <ul>
              <ListGroup variant="flush">
                {pokemonData?.abilities.map(ability => (
                  <ListGroup.Item key={ability.ability.name}>
                    {ability.ability.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div >
  );
}

export { PokemonCard };
