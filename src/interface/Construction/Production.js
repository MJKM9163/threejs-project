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

export const Production = (props) => {
  const [render, setRender] = useState(false);

  //const awaitings = screenStore.getState().awaitArray;
  const productionArray = screenStore((state) => state.productionArray);
  const production = screenStore.getState().production;

  console.log("생산 선택창 랜더링");
  return (
    <>
      <ProductionContainer>
        {props.awaitings}
        {productionArray.map((item, index) =>
          production[item].research ? (
            <div
              className="productionInfo"
              key={index}
              onClick={() => {
                setRender(!render);
                props.awaitings.push(
                  productionArray.splice(productionArray.indexOf(item), 1)
                );
                screenStore.setState({ hoverCheck: false });
              }}
              onMouseEnter={() =>
                screenStore.setState({ hoverCheck: ["production", item] })
              }
              onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
            >
              <img
                className="image"
                src={production[item].img}
                alt={"건물 이미지"}
              ></img>
              <div className="imageName">{production[item].name}</div>
            </div>
          ) : null
        )}
      </ProductionContainer>
      <WaitingContainer>
        {props.awaitings.length !== 0
          ? props.awaitings.map((item, index) => (
              <div className="waiting" key={index}>
                <img
                  className="waitingImage"
                  src={production[item].img}
                  alt={"건물 이미지"}
                ></img>
                <div className="waitingName">{production[item].name}</div>
                <div className="waitingTime">대기 중..</div>
              </div>
            ))
          : null}
      </WaitingContainer>
    </>
  );
};

export const MemoProduction = memo(Production);
