import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePokedex } from "../contexts/PokedexContext";
type Props = {
  active?: any;
};

const Container = styled(motion.div)`
  padding: 20px;
`;
const Image = styled(motion.img)`
  width: 100%;
`;

const Title = styled.h2``;
const Fact = styled.div``;

export const Summary: React.FC<Props> = ({ active }) => {
  const { data, fetchPokemon, fetchSpecies } = usePokedex();
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [speciesData, setSpeciesData] = useState<any>(null);

  useEffect(() => {
    fetchPokemon(active).then((res: any) => {
      if (res.data) {
        setPokemonData(res.data);
        //  fetchSpecies(res.data.species.url).then((res: any) => setSpeciesData(res.data));
      }
    });
  }, []);

  console.log(pokemonData);
  // pokemonData?.sprites?.front_default
  return (
    <Container>
      {pokemonData && (
        <div>
          {" "}
          <Image
            src={`https://img.pokemondb.net/sprites/home/normal/${pokemonData?.name}.png`}
          />
        </div>
      )}
      <Title>{pokemonData?.name}</Title>
      <Fact>
        Type:
        {pokemonData?.types?.map((d: any) => ` ${d.type.name}`)}
      </Fact>
      <Fact>Height: {pokemonData?.height} inches</Fact>
      <br />
      Moves:
      <Fact>
        {pokemonData?.moves?.map((d: any) => (
          <li>{d.move.name}</li>
        ))}
      </Fact>
    </Container>
  );
};

export default Summary;
// <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg`}  />
