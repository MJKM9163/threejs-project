import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { MemoProductionControl } from "./ProductionControl";

const HoverInfoConainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  z-index: 100;

  top: 0px;
  left: 0px;

  width: 450px;
  height: 250px;
  //background-color: #a14e4ec3;
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

  console.log("행성 관리창 랜더링");
  return (
    <>
      {hoverCheck ? (
        <HoverInfoConainer>
          <div className="imageName">{allData[hoverCheck[0]][hoverCheck[1]].name}</div>
          {allData[hoverCheck[0]][hoverCheck[1]].video ? (
            <video
              muted
              loop
              autoPlay
              width={250}
              height={250}
              src={allData[hoverCheck[0]][hoverCheck[1]].video}></video>
          ) : (
            <img
              className="imageBox"
              width={450}
              height={250}
              src={allData[hoverCheck[0]][hoverCheck[1]].img}
              alt={"이미지"}></img>
          )}

          <div className="imageScript">{allData[hoverCheck[0]][hoverCheck[1]].description}</div>
        </HoverInfoConainer>
      ) : null}
      <MemoProductionControl />
    </>
  );
};
