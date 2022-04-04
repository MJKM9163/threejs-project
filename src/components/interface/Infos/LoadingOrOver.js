import React from "react";
import styled from "styled-components";
import { screenStore } from "../../../hooks/stores/screenStore";

const LBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  z-index: 10000000;
  opacity: 1;
  background-color: #292929d1;
  color: #ececec;
  cursor: default;

  .st {
    position: absolute;
    top: 40%;
    left: 50%;
    font-size: 40px;
    transform: translate(-50%, -50%);
  }

  .circle {
    position: fixed;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border: 10px solid #fff;
    border-top: 10px solid orange;
    border-radius: 50em;
    transition: all 0.2s;
    animation: spinCircle 0.8s infinite ease-out;
  }

  @keyframes spinCircle {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const OBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => (props.check ? 10000001 : -10000)};
  opacity: ${(props) => (props.check ? 1 : 0)};
  background-color: #292929d1;
  color: #ececec;
  cursor: default;
  .ot {
    transition: 0.5s;
    position: absolute;
    top: ${(props) => (props.check ? "40%" : "50%")};
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
  }
`;

export const Loading = () => {
  return (
    <LBox>
      <div className="st">로딩중 입니다!</div>
      <div className="circle"></div>
    </LBox>
  );
};

export const Over = () => {
  const check = screenStore((state) => state.gameOverCheck);

  return (
    <OBox check={check}>
      <div className="ot">중심 행성이 파괴되었습니다!</div>
    </OBox>
  );
};
