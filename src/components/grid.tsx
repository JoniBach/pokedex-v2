import { Link, useLocation } from "@reach/router";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { usePokedex } from "../contexts/PokedexContext";
import Summary from "./summary";
type Props = {
  rotate?: any;
  children?: any;
};
const Title = styled(motion.h3)`
  text-align: center;
`;
const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
  img {
    width: 100%;
  }
`;
const Input = styled(motion.input)`
  padding: 30px;
  position: fixed;
  top: 100;
`;

export const Grid: React.FC<Props> = () => {
  const { data, fetchPokemon } = usePokedex();

  const [active, setActive] = useState<string>("");

  const [pokemon, setPokemon] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [partial, setPartial] = useState<any>([]);

  const submitSearch = async (name: any) => {
    setLoading(true);
    const { data } = await fetchPokemon(name);
    setPokemon(data);
    setLoading(false);
  };

  const partialSearch = async (name: any) => {
    const checkList =
      name.length >= 3 &&
      (await data?.results?.filter((newData: any) =>
        newData.name.includes(name)
      ));
    checkList.length > 0 ? setPartial(checkList) : setPartial([]);
    checkList.length === 1 && submitSearch(partial[0].name);
  };

  const results = data?.results;
  const listData = () => {
    if (partial?.length > 0) {
      return partial;
    } else {
      return results;
    }
  };
  const location = useLocation()
console.log(location)
  return (
    <>
   
      {location.search ? (
        <Summary active={location.search.replace('?', '')} />
      ) : (
        <>
           <Input
        onChange={(e) => partialSearch(e.target.value)}
        placeholder="search"
        style={{ width: "100%", padding: 5 }}
      />
        <Container>
          {listData()?.map((d: any) => (
            <Link to={`/?${d.name}`}>
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${d.name}.png`}
              />
              <Title>{d.name}</Title>
            </Link>
          ))}
        </Container>
        </>
      )}
    </>
  );
};

export default Grid;
// <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg`}  />
