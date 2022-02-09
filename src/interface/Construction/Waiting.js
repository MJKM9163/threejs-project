import React, { memo } from "react";
import styled from "styled-components";

const WaitingContainer = styled.div`
  width: 25%;
  /* display: flex;
  flex-direction: row; */

  .waiting {
    //position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid yellow;

    .waitingImage {
      //position: absolute;
      z-index: -2;
      width: 160px;
      height: 90px;
    }
    .waitingName {
      //width: 200px;
      color: white;
      font-size: 21px;
    }
    .waitingTime {
      color: white;
    }
  }
`;

export const Waiting = (props) => {
  console.log("대기열 랜더링");
  return (
    <WaitingContainer>
      {props.awaitings.length !== 0
        ? props.awaitings.map((item, index) => (
            <div className="waiting" key={index}>
              <img
                className="waitingImage"
                src={props.allData.production[item].img}
                alt={"건물 이미지"}
              ></img>
              <div className="waitingName">
                {props.allData.production[item].name}
              </div>
              <div className="waitingTime">대기 중..</div>
            </div>
          ))
        : null}
    </WaitingContainer>
  );
};

export const MemoWaiting = memo(Waiting);

// const WaitingContainer = styled.div``;

// export const Waiting = (props) => {
//   console.log("대기열 퍼센트 랜더링");
//   return <WaitingContainer>대기대기중중</WaitingContainer>;
// };
