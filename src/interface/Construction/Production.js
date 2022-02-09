import React, { memo, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";

const ProductionContainer = styled.div`
  width: 50%;
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

export const Production = (props) => {
  const [render, setRender] = useState(false);

  console.log("생산 선택창 랜더링");
  return (
    <ProductionContainer>
      {props.allData.productionArray.map((item, index) =>
        props.allData.production[item].research ? (
          <div
            className="productionInfo"
            key={index}
            onClick={() => {
              setRender(!render);
              props.awaitings.push(
                props.allData.productionArray.splice(
                  props.allData.productionArray.indexOf(item),
                  1
                )
              );
            }}
            //onMouseEnter={() => setHoverCheck(["production", item])}
            onMouseEnter={() =>
              planetStore.setState({ hoverCheck: ["production", item] })
            }
            onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
          >
            <img
              className="image"
              src={props.allData.production[item].img}
              alt={"건물 이미지"}
            ></img>
            <div className="imageName">
              {props.allData.production[item].name}
            </div>
          </div>
        ) : null
      )}
    </ProductionContainer>
  );
};

export const MemoProduction = memo(Production);
