import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { usePokedex } from "../contexts/PokedexContext";
import Old from "../pages/old";

import Radial from "./radial";

const background = "#68b2cf";
const borderColour = "#333";

const Container = styled(motion.div)`

`;
const TopGroup = styled(motion.div)`
  z-index: 10;

  height: 50%;
  width: 100%;
  position: absolute;
  top: -10px;
  border-bottom: 10px solid ${borderColour};
  background-image: linear-gradient(-180deg, #ff8989 0%, #c01f1f 100%);
  box-shadow: 0 -0.25rem 1.5rem #9b0f0f inset,
    0 0.75rem 0.5rem rgba(148, 110, 110, 0.4) inset,
    0 0.25rem 0.5rem 0 #cf4646 inset;
  /* pointer-events: none; */

`;
const TopShutter = styled(motion.div)``;

const BottomShutter = styled(motion.div)`
  z-index: 10;
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: -10px;
  background: #ddd;
  border-top: 10px solid ${borderColour};

  background-image: linear-gradient(-180deg, #ffffff 0%, #afafaf 100%);
  box-shadow: 0 1rem 1.25rem 0 #cccccc7e, 0 -0.25rem 1.5rem #a5a5a5 inset,
    0 0.75rem 0.5rem rgba(255, 255, 255, 0.4) inset,
    0 0.25rem 0.5rem 0 #8d8d8d inset;
`;

const Clasp = styled(motion.div)`
pointer-events: all

  z-index: 11;
  height: 15vw;
  width: 15vw;
  position: absolute;
  left: 50%;
  bottom: 0;
  background: white;
  transform: translate(-50%, 50%);
  border-radius: 100%;
  border: 10px solid ${borderColour};
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

`;
const Button = styled(motion.div)`
pointer-events: all
  z-index: 12;
  height: 10vw;
  width: 10vw;
  position: absolute;
  left: 50%;
  top: 50%;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  border: 5px solid ${borderColour};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  cursor: pointer;
`;

const Inside = styled(motion.div)`
  position: absolute;
  top: 5%;
  background: ${background};
  width: 100%;
  height: 90%;
  overflow: scroll;
  height: 90%;
`;

const Content = styled(motion.div)`
  width: 100%;
  z-index: 9999;
`;

const Head = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;

  .left {
    max-width: 35vw;
    padding: 5px;
    background: ${background};
  }
  .right {
    max-width: 35vw;
    text-align: right;
    padding: 5px;
    background: ${background};
  }
`;

type Props = {};

export const Cover: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { clock, weather, weatherString, location, locationString } =
    usePokedex();

  const variants = (pos: string) => {
    return {
      closed: { opacity: 1, x: 0 },
      open: { opacity: 1, y: pos },
    };
  };
  const contentVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      <Inside animate={isOpen ? "open" : "closed"} variants={contentVariants}>
        <Head>
          <div className="left">{clock}</div>
          <div className="right">
            {weatherString} {locationString}
          </div>
        </Head>
        <Radial />

        <Content>
          <Old />
        </Content>
      </Inside>
      
        <BottomShutter
          animate={isOpen ? "open" : "closed"}
          variants={variants("90%")}
        />
        <TopGroup
          animate={isOpen ? "open" : "closed"}
          variants={variants("-90%")}
        >
          <TopShutter />
          <Clasp >
            <Button onClick={() => setIsOpen(!isOpen)} />
          </Clasp>
        </TopGroup>
    </>
  );
};

export default Cover;
