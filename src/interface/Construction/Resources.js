import React from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";

const ResourcesContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  display: flex;
  align-items: center;
  left: 50vw;
  bottom: 95vh;
  width: 40%;
  height: 40px;
  transform: translate(-50%);
  cursor: default;
  z-index: 50;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    height: 100%;
    padding: 0px 10px 0px 10px;
    font-weight: bold;
    transition: 0.3s;
    span {
      font-size: 16px;
      margin-right: 5px;
    }
  }

  div:nth-child(1) {
    color: #b8b8b8;
  }
  div:nth-child(2) {
    color: #b8b8b8;
  }
  div:nth-child(3) {
    color: #b8b8b8;
  }
  div:nth-child(4) {
    color: #b8b8b8;
  }
  div:nth-child(5) {
    color: #b8b8b8;
  }
`;

export const Resources = () => {
  const allResources = planetStore((state) => state.allResources);
  //console.log(allResources);
  return (
    <ResourcesContainer>
      <div
        onMouseEnter={() => screenStore.setState({ hoverCheck: "potato" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/corn.png" width={25} height={25} alt="식량 자원"></img>
        <span>{Math.floor(allResources.food)}</span>
      </div>
      <div
        onMouseEnter={() => screenStore.setState({ hoverCheck: "gear" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/gear.png" width={25} height={25} alt="생산력"></img>
        <span>{allResources.gear}</span>
      </div>
      <div
        onMouseEnter={() => screenStore.setState({ hoverCheck: "science" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/flask.png" width={25} height={25} alt="과학 자원"></img>
        <span>{allResources.science}</span>
      </div>
      <div
        onMouseEnter={() => screenStore.setState({ hoverCheck: "titanium" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/titanium.png" width={25} height={25} alt="티타늄 자원"></img>
        <span>{allResources.titanium}</span>
      </div>
      <div
        onMouseEnter={() => screenStore.setState({ hoverCheck: "orichalcon" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/orichalcon.png" width={25} height={25} alt="오리하르콘 자원"></img>
        <span>{allResources.orichalcon}</span>
      </div>
    </ResourcesContainer>
  );
};
