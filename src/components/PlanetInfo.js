import React, { useRef } from "react";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";

const PlanetInfoDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.info === "space" ? 0 : 100)};
  background-color: ${(props) =>
    props.info === "space" ? "gray" : "#4343437b"};
  transition: 0.5s;
`;

const Infodiv = styled.div`
  position: fixed;
  right: 0px;
  width: 400px;
  height: 500px;

  .color-box {
    width: 100%;
    height: 100%;
    background-color: #000000c3;
    border: 1px solid #000000;
    //background-color: #ffebb5;
    border-radius: 16px;
    box-shadow: inset 0 0 8px #000000;
  }
`;

const InfoTextBox = styled.div`
  position: absolute;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 100%;
  height: 100%;
  text-align: center;
  color: #d3d3d3;
  .name {
  }
`;

export const PlanetInfo = () => {
  const infoName = useStore((state) => state.name);

  console.log(infoName);
  return (
    <PlanetInfoDiv info={infoName}>
      <Infodiv>
        <InfoTextBox>
          <div className="name">이름: {infoName}</div>
          <div className="type">종류: 얼음 행성</div>
          <div className="special">특이 사항: Hallucinated air</div>
        </InfoTextBox>
        <div className="color-box" />
      </Infodiv>
    </PlanetInfoDiv>
  );
};
