import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import produce from "immer";
import { MemoLeftInfo } from "./LeftInfo";
import { MemoProduction } from "./Production";
import { MemoResources } from "./Resources";

const ConstructionContainerDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: ${(props) => (props.indexnum ? -5 : 200)};
  opacity: ${(props) => (props.indexnum ? 0 : 1)};
  cursor: default;

  .flexBox {
    position: absolute;
    display: flex;
    width: 100%;
    height: 200px;
    bottom: 0px;

    background-color: #24272b13;
  }
`;
const HoverInfoConainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  z-index: 100;

  top: 0px;
  left: 0px;

  width: 450px;
  height: 250px;

  div {
    background-color: #000000c3;
    width: 100%;
    color: white;
  }

  .imageName {
    font-size: 20px;
  }

  .imageScript {
    font-size: 15px;
  }
`;

// const Hoverimage = styled.div`
//   font-family: "Noto Sans KR", sans-serif;
//   position: absolute;
//   z-index: 100;
//   left: 10px;
//   top: 5px;
//   width: 450px;
//   height: 250px;

//   div {
//     background-color: #000000c3;
//     width: 100%;
//     color: white;
//   }

//   .imageName {
//     font-size: 20px;
//   }

//   .imageScript {
//     font-size: 15px;
//   }
// `;

let zero = 0;
export const ConstructionContainer = () => {
  let allData = screenStore.getState();
  let planetName = useStore.getState().name;
  const hoverCheck = screenStore((state) => state.hoverCheck);
  const resources = planetStore((state) => state.planetResources);

  useEffect(() => {
    screenStore.subscribe(
      (state) => state,
      (state) => {
        allData = state;
      }
    );
  }, []);
  useEffect(() => {
    useStore.subscribe(
      (state) => state.name,
      (state) => {
        planetName = state;
      }
    );
  }, []);

  // console.log(
  //   resources.find((item) => (item[planetName] ? true : false))[planetName]
  // );
  // console.log(resources.find((item) => (item[planetName] ? true : false)));
  console.log(allData);
  console.log(resources);
  console.log(planetName);
  console.log("행성 관리창 랜더링");

  return (
    <>
      {hoverCheck ? (
        <HoverInfoConainer>
          <div className="imageName">
            {allData[hoverCheck[0]][hoverCheck[1]].name}
          </div>
          {allData[hoverCheck[0]][hoverCheck[1]].video ? (
            <video
              muted
              loop
              autoPlay
              width={250}
              height={250}
              src={allData[hoverCheck[0]][hoverCheck[1]].video}
            ></video>
          ) : (
            <img
              className="imageBox"
              width={450}
              height={250}
              src={allData[hoverCheck[0]][hoverCheck[1]].img}
              alt={"이미지"}
            ></img>
          )}

          <div className="imageScript">
            {allData[hoverCheck[0]][hoverCheck[1]].description}
          </div>
        </HoverInfoConainer>
      ) : null}
      {resources.length !== 0
        ? resources.find((item) => item[planetName])[planetName].control
        : null}
      {/* ----------------------------------------------- */}
      {/* <ConstructionContainerDiv
        indexnum={
          resources[planetName]?.hide === undefined
            ? true
            : resources[planetName]?.hide
        }
      >
        <MemoResources />
        <div className="flexBox">
          <MemoLeftInfo planetName={planetName} resources={resources} />
          <MemoProduction
            awaitArray={allData.awaitArray}
            production={allData.production}
            productionArray={allData.productionArray}
          />
        </div>
      </ConstructionContainerDiv> */}
    </>
  );
};
