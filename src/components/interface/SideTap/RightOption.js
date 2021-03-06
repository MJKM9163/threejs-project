import React, { useState } from "react";
import styled from "styled-components";
import { screenStore } from "../../../hooks/stores/screenStore";

const RightOptionBox = styled.div`
  position: absolute;
  flex-direction: column;
  display: flex;
  width: 50px;
  top: 50%;
  right: 0px;

  transform: translateY(-50%);
  background-color: #7ed0ff7d;
  outline: 1px solid #8af1ff7b;
  color: black;
  z-index: 10000000;

  img:not(.satelliteIcon) {
    border: 1px solid #8af1ff7b;
    :hover {
      background-color: #7ed0ffb5;
      transition: 0.2s;
    }
    :active {
      background-color: #e9f7ffb5;
    }
  }

  .satelliteNum {
    color: ${(props) => (props.satelliteNum > 0 ? "#84fff5b5" : "#ff6565b5")};
    font-weight: bold;
    cursor: default;
    :hover {
      :after {
        content: "위성 개수";
        position: absolute;
        width: 100px;
        height: 50px;
        bottom: -30px;
        left: -70px;
        color: white;
      }
    }
    .satelliteIcon {
      margin: 0px 0px 0px 1px;
      vertical-align: bottom;
    }
  }
`;

const background = new Audio("soundEffects/background.mp3");
export const RightOption = () => {
  const leftInfoOnOff = screenStore((state) => state.leftInfoOnOff);
  const researchMapOnOff = screenStore((state) => state.researchMapOnOff);
  const satelliteMapOnOff = screenStore((state) => state.satelliteMapOnOff);
  const satelliteNum = screenStore((state) => state.satellite);
  const eventCheck = screenStore((state) => state.eventCheck);

  const [mcontrol, setMcontrol] = useState(true);

  if (eventCheck === true) {
    background.muted = true;
    setTimeout(() => {
      background.muted = false;
    }, 8000);
  }

  background.volume = 0.2;
  background.loop = true;
  return (
    <RightOptionBox satelliteNum={satelliteNum}>
      <img
        onClick={() => {
          if (mcontrol) {
            background.play();
            setMcontrol(false);
          } else {
            background.pause();
            setMcontrol(true);
          }
        }}
        src={mcontrol ? "images/Html/musicMute.png" : "images/Html/music.png"}
        width={50}
        height={50}
        alt="music button"></img>
      <img
        onClick={() => {
          screenStore.setState({ leftInfoOnOff: !leftInfoOnOff });
        }}
        src={"images/Html/eye.png"}
        width={50}
        height={50}
        alt="eye button"></img>
      <img
        onClick={() => {
          screenStore.setState({ researchMapOnOff: !researchMapOnOff });
        }}
        src={"images/Html/flaskTap.png"}
        width={50}
        height={50}
        alt="flask button"></img>
      <img
        onClick={() => {
          screenStore.setState({ satelliteMapOnOff: !satelliteMapOnOff });
        }}
        src={"images/Html/orbit.png"}
        width={50}
        height={50}
        alt="satellite button"></img>
      <span className="satelliteNum">
        <img
          className="satelliteIcon"
          src={"images/Html/satellite.png"}
          width={20}
          height={20}
          alt="satellite icon"></img>
        {satelliteNum}
      </span>
    </RightOptionBox>
  );
};
