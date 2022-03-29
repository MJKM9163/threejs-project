import React from "react";
import styled from "styled-components";

const startOrOverBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10000000;
  opacity: 1;
`;

export const startOrOver = () => {
  return <startOrOverBox></startOrOverBox>;
};
