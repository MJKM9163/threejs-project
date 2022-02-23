import React, { memo } from "react";
import styled from "styled-components";

const WarningBox = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  display: ${(props) => (props.warning ? "block" : "none")};
  top: ${(props) => props.pos[0] - 30 + "px"};
  left: ${(props) => props.pos[1] - 55 + "px"};
  width: 245px;
  text-align: center;
  z-index: 50000;
  color: black;

  animation: warning alternate infinite linear 0.8s;
  @keyframes warning {
    0% {
      background-color: #c06a6aeb;
    }
    100% {
      background-color: #ff6464eb;
    }
  }
`;

let effet;
let audioCheck = true;
export const ResearchWarning = ({ pos, warning, setWarning, message }) => {
  let testAudio = new Audio("soundEffects/clicks/clickWarning.mp3");

  if (warning === true && audioCheck === true) {
    audioCheck = false;
    testAudio.volume = 0.5;
    testAudio.play();
  }
  clearTimeout(effet);
  effet = setTimeout(() => {
    setWarning(false);
    audioCheck = true;
  }, 1500);

  return (
    <WarningBox pos={pos} warning={warning}>
      {message}
    </WarningBox>
  );
};

export const MemoResearchWarning = memo(ResearchWarning);
