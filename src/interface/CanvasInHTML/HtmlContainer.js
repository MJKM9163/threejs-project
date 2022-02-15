import React, { useState } from "react";
import styled from "styled-components";

const HtmlContainerDiv = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  color: white;
  transform: translate(-30%, -33%);

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
    width: 200px;
    height: 200px;
    //background-color: red;
    circle {
      transition: 0.2s;
    }
  }
`;

export const HtmlContainer = () => {
  const [opacity, setOpacity] = useState({ top: 0.8, buttom: 0.8 });
  console.log(opacity);
  console.log("tap 창 랜더링");
  return (
    <HtmlContainerDiv>
      <div className="imageBox">
        <img className="state" src={"images/Html/state.png"} alt={"상태 확인"}></img>
        <img
          className="completion"
          src={"images/Html/completion.png"}
          alt={"완성된 건물 확인"}></img>
      </div>
      <svg viewBox="0 0 200 200">
        <circle
          style={{ opacity: opacity.top }}
          onMouseOver={() => setOpacity({ ...opacity, top: 0.5 })}
          onMouseLeave={() => setOpacity({ ...opacity, top: 0.8 })}
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="DeepSkyBlue"
          strokeWidth="50"
          strokeDasharray={2 * Math.PI * 65 * 0.75}
          strokeDashoffset={2 * Math.PI * 65 * 0.75}
          onClick={() => console.log("딥스카이블루")}
        />
        <circle
          style={{ opacity: opacity.buttom }}
          onMouseOver={() => setOpacity({ ...opacity, buttom: 0.5 })}
          onMouseLeave={() => setOpacity({ ...opacity, buttom: 0.8 })}
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="MistyRose"
          strokeWidth="50"
          strokeDasharray={2 * Math.PI * 65 * 0.75}
          strokeDashoffset={2 * Math.PI * 65 * 0.5}
          onClick={() => console.log("미스티 로즈")}
        />
      </svg>
    </HtmlContainerDiv>
  );
};
