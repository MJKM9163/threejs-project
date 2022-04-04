import React, { useState } from "react";
import styled from "styled-components";
import { screenStore } from "../../../hooks/stores/screenStore";

const TapPlanetDiv = styled.div`
  display: flex;
  width: 100px;
  height: 200px;
  color: white;
  transform: translate(10%, -50%);

  .imageBox {
    pointer-events: none;
    img {
      left: 50%;
      position: absolute;
      z-index: 2;
    }
    .state {
      width: 40px;
      height: 40px;
      transform: translate(-50%, -35%);
      top: 50px;
    }
    .completion {
      width: 35px;
      height: 35px;
      transform: translate(-55%, -25%);
      top: 130px;
    }
  }

  svg {
    width: 100px;
    height: 200px;
    circle {
      transition: 0.2s;
    }
  }
`;

export const TapPlanet = ({ planet }) => {
  const [opacity, setOpacity] = useState({ top: 0.8, buttom: 0.8 });

  return (
    <TapPlanetDiv>
      <div className="imageBox">
        <img className="state" src={"images/Html/state.png"} alt={"상태 확인"} />
        <img className="completion" src={"images/Html/completion.png"} alt={"연구소"} />
      </div>
      <svg
        viewBox="100 0 100 200"
        onMouseUp={() => {
          screenStore.setState({ tapCheck: false });
        }}>
        <circle
          style={{ opacity: opacity.top }}
          onMouseOver={() => setOpacity({ ...opacity, top: 0.5 })}
          onMouseLeave={() => setOpacity({ ...opacity, top: 0.8 })}
          onMouseUp={() => {
            screenStore.setState({ tapCheck: false });
          }}
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="DeepSkyBlue"
          strokeWidth="50"
          strokeDasharray={2 * Math.PI * 65 * 0.75}
          strokeDashoffset={2 * Math.PI * 65 * 0.75}
        />
        <circle
          style={{ opacity: opacity.buttom }}
          onMouseOver={() => setOpacity({ ...opacity, buttom: 0.5 })}
          onMouseLeave={() => setOpacity({ ...opacity, buttom: 0.8 })}
          onMouseUp={() => {
            screenStore.setState({ tapCheck: false });
          }}
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="MistyRose"
          strokeWidth="50"
          strokeDasharray={2 * Math.PI * 65 * 0.75}
          strokeDashoffset={2 * Math.PI * 65 * 0.5}
        />
      </svg>
    </TapPlanetDiv>
  );
};
