import React, { memo, useMemo } from "react";
import styled from "styled-components";

const WarningBox = styled.span`
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
export const ResearchWarning = ({ pos, warning, setWarning, message }) => {
  //const warningAudio = new Audio("soundEffects/clickWarning.mp3");
  const warningAudio = useMemo(() => new Audio("soundEffects/clickWarning.mp3"), []);

  if (warning === true) {
    warningAudio.volume = 0.5;
    warningAudio.play();
  }
  clearTimeout(effet);
  effet = setTimeout(() => {
    setWarning(false);
  }, 1500);
  //console.log("연구 경고");
  return (
    <WarningBox pos={pos} warning={warning}>
      {message}
    </WarningBox>
  );
};

export const MemoResearchWarning = memo(ResearchWarning);
