import { motion } from "framer-motion";
import styled from "styled-components";
import Cover from "../components/cover";

const Container = styled(motion.div)`
`;

type Props = {};

export const Main: React.FC<Props> = () => {
  return <Container>
      <Cover />
  </Container>;
};

export default Main;
