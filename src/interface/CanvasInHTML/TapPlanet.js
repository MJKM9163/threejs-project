import React, { useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";

const TapPlanetDiv = styled.div`
  display: flex;
  width: 100px;
  height: 200px;
  color: white;
  transform: translate(10%, -50%);
  //background-color: red;
  //pointer-events: none;

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
    //background-color: #a17676;
    circle {
      transition: 0.2s;
    }
  }
`;

export const TapPlanet = ({ planet }) => {
  const [opacity, setOpacity] = useState({ top: 0.8, buttom: 0.8 });

  console.log("tap 창 랜더링");
  return (
    <TapPlanetDiv>
      <div className="imageBox">
        <img className="state" src={"images/Html/state.png"} alt={"상태 확인"}></img>
        <img
          className="completion"
          src={"images/Html/completion.png"}
          alt={"완성된 건물 확인"}></img>
      </div>
      <svg
        viewBox="100 0 100 200"
        onMouseUp={() => {
          planetStore.setState({ tapState: { planetName: "???", check: false } });
        }}>
        <circle
          style={{ opacity: opacity.top }}
          onMouseOver={() => setOpacity({ ...opacity, top: 0.5 })}
          onMouseLeave={() => setOpacity({ ...opacity, top: 0.8 })}
          onMouseUp={() => {
            planetStore.setState({ tapState: { planetName: planet, check: false } });
            console.log("스카이 블루");
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
            planetStore.setState({ tapState: { planetName: planet, check: false } });
            console.log("미스티 로즈");
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
