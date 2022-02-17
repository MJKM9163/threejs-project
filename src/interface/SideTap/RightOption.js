import React from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const RightOptionBox = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  background-color: #7ed0ff7d;
  outline: 1px solid #8af1ff7b;
  color: black;
  transition: 0.2s;
  z-index: 10;

  :hover {
    background-color: #7ed0ffb5;
  }
`;

export const RightOption = () => {
  const leftInfoOnOff = screenStore((state) => state.leftInfoOnOff);

  return (
    <RightOptionBox>
      <img
        onClick={() => {
          if (leftInfoOnOff === "false") {
            screenStore.setState({ leftInfoOnOff: true });
          } else if (leftInfoOnOff === "true") {
            screenStore.setState({ leftInfoOnOff: false });
          }
        }}
        src={"images/Html/eye.png"}
        width={50}
        height={50}
        alt="leftInfo button"></img>
    </RightOptionBox>
  );
};
