import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { effectSound } from "../../../hooks/stores/effectSound";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";

const ProductionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  background-color: #7e10103c;

  .productionInfo {
    position: relative;
    width: 150px;
    height: 84px;
    transition: background-color 0.2s;
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
  background-color: #4b7e103b;

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
      z-index: 1;
      width: 160px;
      height: 90px;
    }
    .waitingName {
      color: #b8b8b8;
      font-size: 21px;
    }
    .waitingTime {
      color: #b8b8b8;
      margin-right: 20px;
    }
  }
`;

let wI = 0;
let delay = 500;
let wCheck = false;
let wUp;

export const Production = ({ allData }) => {
  const [render, setRender] = useState(false);
  const [reload, setReload] = useState(0);

  const gear = useRef(planetStore.getState().allResources.gear);
  const resources = useRef(planetStore.getState().allResources);

  const warningAudio = useMemo(() => new Audio("soundEffects/lackOfResources.mp3"), []);

  useEffect(() => {
    planetStore.subscribe(
      (state) => (gear.current = state.allResources.gear),
      (state) => state
    );
  });
  useEffect(() => {
    planetStore.subscribe(
      (state) => (resources.current = state.allResources),
      (state) => state
    );
  });

  const numUp = (delay, awaitArray, production) => {
    if (wCheck === false) {
      wCheck = true;
      wUp = setInterval(() => {
        wI += gear.current;
        if (awaitArray[0][1] <= wI) {
          clearTimeout(wUp);
          effectSound.getState().conCompletion.action();
          if (production[awaitArray[0][0]].repetition) {
            production[awaitArray[0][0]].completion = false;
          } else {
            production[awaitArray[0][0]].completion = true;
          }
          production[awaitArray[0][0]].event();
          screenStore.setState({
            resourcesProduction: allData.resourcesProduction,
          });
          for (let r in production[awaitArray[0][0]].add) {
            if (r === "food") {
              // 임시 코드
              for (let item in planetStore.getState().planetResources) {
                planetStore.getState().planetResources[item].resources.food =
                  planetStore.getState().planetResources[item].resources.food +
                  production[awaitArray[0][0]].add[r];
                break;
              }
            } else {
              planetStore.setState({
                allResources: {
                  ...planetStore.getState().allResources,
                  [r]: planetStore.getState().allResources[r] + production[awaitArray[0][0]].add[r],
                },
              });
            }
          }

          awaitArray.shift();
          screenStore.setState({
            awaitArray: awaitArray,
          });
          wCheck = false;
          setReload(wI + 1); // 건설 완료 시점 랜더링 조정
          wI = 0;
          if (allData.awaitArray.length > 0) {
            numUp(delay, awaitArray, production);
          }
        }
        setReload(wI); // Interval이 진행 될 떄 마다 랜더링 발생
      }, delay);
    }
  };
  // 20 / 100 = 0.2
  useEffect(() => {
    if (allData.awaitArray.length > 0) {
      numUp(delay, allData.awaitArray, allData.resourcesProduction);
    }
  });

  console.log("생산 선택창 랜더링");
  return (
    <>
      <ProductionContainer>
        {allData.awaitArray}
        {Object.keys(allData.resourcesProduction).map((item, index) =>
          allData.resourcesProduction[item].research && !allData.resourcesProduction[item].completion ? (
            <div
              className="productionInfo"
              key={index}
              onClick={(e) => {
                if (
                  allData.resourcesProduction[item].cost.food <= Math.floor(resources.current.food) &&
                  allData.resourcesProduction[item].cost.titanium <= Math.floor(resources.current.titanium) &&
                  allData.resourcesProduction[item].cost.orichalcon <=
                    Math.floor(resources.current.orichalcon)
                ) {
                  planetStore.setState({
                    allResources: {
                      ...resources.current,
                      food: resources.current.food - allData.resourcesProduction[item].cost.food,
                      titanium: resources.current.titanium - allData.resourcesProduction[item].cost.titanium,
                      orichalcon:
                        resources.current.orichalcon - allData.resourcesProduction[item].cost.orichalcon,
                    },
                  });
                  allData.awaitArray.push([item, allData.resourcesProduction[item].max]);

                  screenStore.setState({
                    awaitArray: allData.awaitArray,
                  });

                  allData.resourcesProduction[item].completion = "progress";
                  screenStore.setState({
                    resourcesProduction: allData.resourcesProduction,
                  });

                  setRender(!render);
                  screenStore.setState({ hoverCheck: false });
                } else {
                  warningAudio.volume = 0.5;
                  warningAudio.play();
                }
              }}
              onMouseEnter={() => screenStore.setState({ hoverCheck: item })}
              onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
              <img className="image" src={allData.resourcesProduction[item].img} alt={"건물 이미지"}></img>
              <div className="imageName">{allData.resourcesProduction[item].name}</div>
            </div>
          ) : null
        )}
      </ProductionContainer>
      <WaitingContainer
        num={
          allData.awaitArray.length !== 0 ? Math.floor((wI / allData.awaitArray[0][1]) * 100) + "%" : null
        }>
        {allData.awaitArray.length !== 0
          ? allData.awaitArray.map((item, index) => (
              <div
                className="waiting"
                key={index}
                onClick={() => {
                  if (allData.awaitArray[0][0] === item[0]) {
                    wI = 0;
                  }
                  allData.resourcesProduction[item[0]].completion = false;
                  screenStore.setState({
                    resourcesProduction: allData.resourcesProduction,
                  });

                  allData.awaitArray.splice(index, 1);
                  screenStore.setState({
                    awaitArray: allData.awaitArray,
                  });

                  clearTimeout(wUp);
                  wCheck = false;
                  setRender(!render);
                  console.log("대기 그림 클릭");
                }}>
                <img
                  className="waitingImage"
                  src={allData.resourcesProduction[item[0]].img}
                  alt={"건물 이미지"}></img>
                <div className="waitingName">{allData.resourcesProduction[item[0]].name}</div>
                <div className="waitingTime">
                  {allData.awaitArray[0][0] === item[0]
                    ? Math.floor((wI / allData.awaitArray[0][1]) * 100) + " %"
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
