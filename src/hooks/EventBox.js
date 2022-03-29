import React, { useEffect } from "react";
import styled from "styled-components";
import { eventStore } from "./stores/eventStore";
import { screenStore } from "./stores/screenStore";

const EventContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 850px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s opacity;
  z-index: ${(props) => (props.check ? 1000050 : -10000)};
  opacity: ${(props) => (props.check ? 1 : 0)};
  background-color: #b9b9b929;
  outline: 1px solid Lightblue;
  cursor: default;

  .eventName {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 10%;
    font-size: 30px;
    text-align: center;
    color: #d3d3d3;
    background-color: #ffffff29;
  }

  .eventImage {
    width: 100%;
    height: 63%;
  }

  .eventDescription {
    width: 100%;
    height: 20%;
    padding: 5px;
    font-size: 20px;
    color: #d3d3d3;
    background-color: #383838;
  }

  .eventButton {
    width: 100%;
    height: 7%;
    font-size: 20px;
    display: flex;
    text-align: center;

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    span:nth-child(1) {
      width: 50%;
      height: 100%;
      color: #808cff;
      background-color: #31767a29;
    }
    span:nth-child(2) {
      width: 50%;
      height: 100%;
      color: #ff7b7b;
      background-color: #99252529;
    }
  }
`;

export const EventBox = () => {
  const eventCheck = screenStore((state) => state.eventCheck);
  const preEvent = eventStore((state) => state.preEvent);

  console.log(preEvent);
  return (
    <EventContainer check={eventCheck}>
      <div className="eventName">{preEvent.name}</div>
      <div className="eventImage">
        <img src={preEvent.img} alt="eventImg" />
      </div>
      <div className="eventDescription">{preEvent.description}</div>
      <div className="eventButton">
        <span
          onClick={() => {
            preEvent.assent();
          }}>
          {preEvent.assentText}
        </span>
        <span
          onClick={() => {
            preEvent.dissent();
          }}>
          {preEvent.dissentText}
        </span>
      </div>
    </EventContainer>
  );
};
