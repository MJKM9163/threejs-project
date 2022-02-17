import React from "react";
import styled from "styled-components";
import { MemoLeftInfo } from "./LeftInfo";

const LeftInfoContainer = styled.div`
  background-color: #ffe4e1a0;
  position: absolute;
  top: -50px;
  left: -100px;
  width: 80px;
  height: 105px;
`;

export const LeftInfoBox = ({ planet }) => {
  return (
    <LeftInfoContainer className="flexBox">
      <MemoLeftInfo planet={planet} />
    </LeftInfoContainer>
  );
};
