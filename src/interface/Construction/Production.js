import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";

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

export const Production = ({ allData }) => {
  const [render, setRender] = useState(false);
  const [reload, setReload] = useState(0);

  const completion = screenStore((state) => state.completion);
  const allGear = useRef(planetStore.getState().allResources.gear);
  const allFood = useRef(planetStore.getState().allResources);

  const warningAudio = useMemo(() => new Audio("soundEffects/lackOfResources.mp3"), []);

  useEffect(() => {
    planetStore.subscribe(
      (state) => state.allResources.gear,
      (state) => (allGear.current = state)
    );
  });
  useEffect(() => {
    planetStore.subscribe(
      (state) => state.allResources,
      (state) => (allFood.current = state)
    );
  });

  const numUp = (delay, awaitArray, completion) => {
    if (check === false) {
      check = true;
      up = setInterval(() => {
        i += allGear.current;
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
          if (allData.awaitArray.length > 0) {
            numUp(delay, awaitArray, completion);
          }
        }
        setReload(i); // Interval이 진행 될 떄 마다 랜더링 발생
      }, delay);
    }
  };
  // 20 / 100 = 0.2
  useEffect(() => {
    if (allData.awaitArray.length > 0) {
      numUp(delay, allData.awaitArray, completion);
    }
  });

  console.log("생산 선택창 랜더링");
  return (
    <>
      <ProductionContainer>
        {allData.awaitArray}
        {allData.productionArray.map((item, index) =>
          allData.resourcesProduction[item].research ? (
            <div
              className="productionInfo"
              key={index}
              onClick={(e) => {
                if (
                  allData.resourcesProduction[item].cost.food <= Math.floor(allFood.current.food) &&
                  allData.resourcesProduction[item].cost.titanium <= Math.floor(allFood.current.titanium) &&
                  allData.resourcesProduction[item].cost.orichalcon <= Math.floor(allFood.current.orichalcon)
                ) {
                  planetStore.setState({
                    allResources: {
                      ...allFood.current,
                      food: allFood.current.food - allData.resourcesProduction[item].cost.food,
                      titanium: allFood.current.food - allData.resourcesProduction[item].cost.titanium,
                      orichalcon: allFood.current.food - allData.resourcesProduction[item].cost.orichalcon,
                    },
                  });
                  allData.awaitArray.push([item, allData.resourcesProduction[item].max]);

                  screenStore.setState({
                    awaitArray: allData.awaitArray,
                  });
                  allData.productionArray.splice(allData.productionArray.indexOf(item), 1);
                  screenStore.setState({
                    productionArray: allData.productionArray,
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
        num={allData.awaitArray.length !== 0 ? Math.floor((i / allData.awaitArray[0][1]) * 100) + "%" : null}>
        {allData.awaitArray.length !== 0
          ? allData.awaitArray.map((item, index) => (
              <div
                className="waiting"
                key={index}
                onClick={() => {
                  if (allData.awaitArray[0][0] === item[0]) {
                    i = 0;
                  }
                  allData.productionArray.push(item[0]);

                  screenStore.setState({
                    productionArray: allData.productionArray,
                  });

                  allData.awaitArray.splice(index, 1);
                  screenStore.setState({
                    awaitArray: allData.awaitArray,
                  });

                  clearTimeout(up);
                  check = false;
                  setRender(!render);
                  console.log("대기 그림 클릭");
                }}>
                <img className="waitingImage" src={allData.resourcesProduction[item[0]].img} alt={"건물 이미지"}></img>
                <div className="waitingName">{allData.resourcesProduction[item[0]].name}</div>
                <div className="waitingTime">
                  {allData.awaitArray[0][0] === item[0]
                    ? Math.floor((i / allData.awaitArray[0][1]) * 100) + " %"
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
