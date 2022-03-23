import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Grid from "./grid";
type Props = {
  rotate?: any;
  children?: any;
};

const Container = styled(motion.div)`
  height: 15vw;
  width: 15vw;
  position: absolute;
  left: 50%;
  top: -2%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  border: 20px solid white;
`;

const Button = styled.div<Props>`
  position: absolute;
  left: calc(50% - 10px);
  top: calc(50% - 0px);
  height: 20px;
  width: 20px;
  border: 2px dotted white;
  border-radius: 50%;
  ${(props: any) =>
    `transform: rotate(${props.rotate}) translateX(calc(10px + 12vw));`}
  .content {
    ${(props: any) => `transform: rotate(-${props.rotate});`}
  }
`;

export const Radial: React.FC<Props> = () => {
  const buttons = ["A-Z", "b", "c", "d", "e"];
  return (
    <Container>
      {buttons.map((d, i) => (
        <Button rotate={`${(i + 1) * 30}deg`}>
          <div className="content"></div>
        </Button>
      ))}
    </Container>
  );
};

export default Radial;
