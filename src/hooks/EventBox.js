import React from "react";
import styled from "styled-components";

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
  z-index: 1000050;
  background-color: #b9b9b929;
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
    color: #d3d3d3;
    background-color: #ffffff29;
  }

  .eventButton {
    width: 100%;
    height: 7%;
    //padding-bottom: 5px;
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

export const EventBox = (props) => {
  return (
    <EventContainer>
      <div className="eventName">{"이벤트 발생!"}</div>
      <div className="eventImage">
        <img src="#" alt="eventImg" />
      </div>
      <div className="eventDescription">{"냐냥고냥고불라블라냥고"}</div>
      <div className="eventButton">
        <span>{"긍정"}</span>
        <span>{"부정"}</span>
      </div>
    </EventContainer>
  );
};
