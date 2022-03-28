import React from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";
import { MemoLeftInfo } from "./LeftInfo";

const LeftInfoContainer = styled.div`
  background-color: #ffe4e1a0;
  position: absolute;
  top: -50px;
  left: -100px;
  width: 80px;
  height: 105px;
  display: ${(props) => (props.check ? "block" : "none")};
`;

export const LeftInfoBox = ({ planet }) => {
  const leftInfoOnOff = screenStore((state) => state.leftInfoOnOff);
  return (
    <LeftInfoContainer className="flexBox" check={leftInfoOnOff}>
      <MemoLeftInfo planet={planet} />
    </LeftInfoContainer>
  );
};
