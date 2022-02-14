import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const ProductionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;

  .productionInfo {
    position: relative;
    width: 25%;
    height: 50%;
    transition: 0.2s;
    :hover {
      background-color: #ffffff3d;
    }
    :active {
      background-color: #ffffff8d;
    }

    .image {
      position: absolute;
      z-index: -2;
      width: 100%;
      height: 100%;
    }
    .imageName {
      position: absolute;
      width: 100%;
      bottom: 0px;
      background-color: #5353535e;
      color: #b8b8b8;
      height: 25px;
    }
  }

  ::-webkit-scrollbar {
    width: 8px; /*스크롤바의 너비*/
  }
  ::-webkit-scrollbar-thumb {
    background-color: #424242; /*스크롤바의 색상*/
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.85); /*스크롤바 트랙 색상*/
  }
`;

const WaitingContainer = styled.div`
  width: 25%;
  /* display: flex;
  flex-direction: row; */

  .waiting {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid yellow;

    :first-child::before {
      position: absolute;
      width: 100%;
      height: ${(props) => props.num};
      bottom: 0px;
      background-color: #cacaca;
      opacity: 20%;
      content: "";
      display: block;
    }

    .waitingImage {
      //position: absolute;
      z-index: 1;
      width: 160px;
      height: 90px;
    }
    .waitingName {
      //position: relative;
      //width: 200px;
      color: #b8b8b8;
      //margin-right: 10px;
      font-size: 21px;
    }
    .waitingTime {
      color: #b8b8b8;
      margin-right: 20px;
    }
  }
`;

let i = 0;
let delay = 500;
let check = false;
let up;

export const Production = (props) => {
  const [render, setRender] = useState(false);
  const [reload, setReload] = useState(0);
  const completion = screenStore((state) => state.completion);

  const numUp = (delay, awaitArray, completion) => {
    if (check === false) {
      check = true;
      up = setInterval(() => {
        i += 7;
        if (awaitArray[0][1] <= i) {
          clearTimeout(up);
          completion.push(awaitArray[0][0]);
          screenStore.setState({
            completion: completion,
          });
          awaitArray.shift();
          screenStore.setState({
            awaitArray: awaitArray,
          });
          check = false;
          setReload(i + 1); // 건설 완료 시점 랜더링 조정
          i = 0;
          if (props.awaitArray.length > 0) {
            numUp(delay, awaitArray, completion);
          }
        }
        setReload(i); // Interval이 진행 될 떄 마다 랜더링 발생
      }, delay);
    }
  };
  // 20 / 100 = 0.2
  useEffect(() => {
    if (props.awaitArray.length > 0) {
      numUp(delay, props.awaitArray, completion);
    }
  });

  console.log("생산 선택창 랜더링");
  return (
    <>
      <ProductionContainer>
        {props.awaitArray}
        {props.productionArray.map((item, index) =>
          props.production[item].research ? (
            <div
              className="productionInfo"
              key={index}
              onClick={() => {
                props.awaitArray.push([item, props.production[item].max]);
                screenStore.setState({
                  awaitArray: props.awaitArray,
                });
                props.productionArray.splice(
                  props.productionArray.indexOf(item),
                  1
                );
                screenStore.setState({
                  productionArray: props.productionArray,
                });
                setRender(!render);
                screenStore.setState({ hoverCheck: false });
              }}
              onMouseEnter={() =>
                screenStore.setState({ hoverCheck: ["production", item] })
              }
              onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
            >
              <img
                className="image"
                src={props.production[item].img}
                alt={"건물 이미지"}
              ></img>
              <div className="imageName">{props.production[item].name}</div>
            </div>
          ) : null
        )}
      </ProductionContainer>
      <WaitingContainer
        num={
          props.awaitArray.length !== 0
            ? Math.floor((i / props.awaitArray[0][1]) * 100) + "%"
            : null
        }
      >
        {props.awaitArray.length !== 0
          ? props.awaitArray.map((item, index) => (
              <div
                className="waiting"
                key={index}
                onClick={() => {
                  if (props.awaitArray[0][0] === item[0]) {
                    i = 0;
                  }
                  props.productionArray.push(item[0]);
                  screenStore.setState({
                    productionArray: props.productionArray,
                  });
                  props.awaitArray.splice(index, 1);
                  screenStore.setState({
                    awaitArray: props.awaitArray,
                  });
                  clearTimeout(up);
                  check = false;
                  setRender(!render);
                  console.log("대기 그림 클릭");
                }}
              >
                <img
                  className="waitingImage"
                  src={props.production[item[0]].img}
                  alt={"건물 이미지"}
                ></img>
                <div className="waitingName">
                  {props.production[item[0]].name}
                </div>
                <div className="waitingTime">
                  {props.awaitArray[0][0] === item[0]
                    ? Math.floor((i / props.awaitArray[0][1]) * 100) + " %"
                    : "대기 중.."}
                </div>
              </div>
            ))
          : null}
      </WaitingContainer>
    </>
  );
};

export const MemoProduction = memo(Production);
