import React, { useEffect, useState } from 'react';
import { InputGroup, Form, Container } from 'react-bootstrap';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    fetch(pokeApi)
      .then(res => res.json())
      .then(data => {
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup className="mb-3">
        <InputGroup.Text id="pokemon-search">Search</InputGroup.Text>
        <Form.Control
          placeholder="Pokemon"
          aria-label="Pokemon"
          aria-describedby="pokemon-search"
          onChange={e => setFilteredPokemonList(pokemonList.filter(
            pokemon => pokemon.name.includes(e.target.value.trim())
          ))} />
      </InputGroup>
      <h1>Pokemon should appear here</h1>
      <Container>
        <div>{
          filteredPokemonList.map(pokemonData => (
            <PokemonCard
              url={pokemonData.url}
              name={pokemonData.name} />
          ))
        }</div>
      </Container>
    </div>
  );
}

export { App };
