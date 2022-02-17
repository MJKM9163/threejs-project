import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";

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

export const Production = ({ production, planetName }) => {
  const [render, setRender] = useState(false);
  const [reload, setReload] = useState(0);
  const resources = planetStore((state) => state.planetResources);
  let name = useRef(useStore.getState().name);
  // let resourcesRef = useRef(planetStore.getState().planetResources);
  // let resources = resourcesRef.current;

  useEffect(() => {
    useStore.subscribe(
      (state) => state.name,
      (state) => {
        name.current = state;
      }
    );
  }, []);
  // useEffect(() => {
  //   planetStore.subscribe(
  //     (state) => state.planetResources,
  //     (state) => {
  //       resourcesRef.current = state;
  //     }
  //   );
  // }, []);

  const numUp = (delay, awaitArray, completion) => {
    if (check === false) {
      check = true;
      up = setInterval(() => {
        i += 7;
        if (awaitArray[0][1] <= i) {
          clearTimeout(up);
          completion.push(awaitArray[0][0]);
          planetStore.setState({
            planetResources: {
              ...resources[name.current],
              [name.current]: {
                ...resources[name.current],
                completion: resources[name.current].completion,
              },
            },
          });
          awaitArray.shift();
          planetStore.setState({
            planetResources: {
              ...resources,
              [name.current]: {
                ...resources[name.current],
                awaitArray: resources[name.current].awaitArray,
              },
            },
          });
          check = false;
          setReload(i + 1); // 건설 완료 시점 랜더링 조정
          i = 0;
          if (awaitArray.length > 0) {
            numUp(delay, awaitArray, completion);
          }
        }
        setReload(i); // Interval이 진행 될 떄 마다 랜더링 발생
      }, delay);
    }
  };
  // 20 / 100 = 0.2
  useEffect(() => {
    if (resources[name.current].awaitArray.length > 0) {
      numUp(delay, resources[name.current].awaitArray, resources[name.current].completion);
    }
  });
  console.log(name.current, "현재 선택 된 이름");
  console.log(planetName.name);
  console.log(name.current === planetName.name);
  console.log(resources[name.current]);
  console.log("생산 선택창 랜더링");
  return (
    <>
      <ProductionContainer>
        {/* {resourcesIn.awaitArray} */}
        {resources[name.current].productionArray.map((item, index) =>
          production[item].research ? (
            <div
              className="productionInfo"
              key={index}
              onClick={() => {
                if (useStore.getState().name === name.current) {
                  resources[name.current].awaitArray.push([item, production[item].max]);

                  planetStore.setState({
                    planetResources: {
                      ...resources,
                      [name.current]: {
                        ...resources[name.current],
                        awaitArray: resources[name.current].awaitArray,
                      },
                    },
                  });
                  resources[name.current].productionArray.splice(
                    resources[name.current].productionArray.indexOf(item),
                    1
                  );
                  planetStore.setState({
                    planetResources: {
                      ...resources,
                      [name.current]: {
                        ...resources[name.current],
                        productionArray: resources[name.current].productionArray,
                      },
                    },
                  });

                  //setRender(!render);
                  screenStore.setState({ hoverCheck: false });
                }
              }}
              onMouseEnter={() => screenStore.setState({ hoverCheck: ["production", item] })}
              onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
              <img className="image" src={production[item].img} alt={"건물 이미지"}></img>
              <div className="imageName">{production[item].name}</div>
            </div>
          ) : null
        )}
      </ProductionContainer>
      {/* {name.current === planetName.name ? (
        <WaitingContainer
          num={
            resources[name.current].awaitArray.length !== 0
              ? Math.floor((i / resources[name.current].awaitArray[0][1]) * 100) + "%"
              : null
          }
          style={{ zIndex: name.current === planetName.name ? 5 : -5 }}>
          {resources[name.current].awaitArray.length !== 0
            ? resources[name.current].awaitArray.map((item, index) => (
                <div
                  className="waiting"
                  key={index}
                  onClick={() => {
                    if (useStore.getState().name === name.current) {
                      if (resources[name.current].awaitArray[0][0] === item[0]) {
                        i = 0;
                      }
                      resources[name.current].productionArray.push(item[0]);

                      planetStore.setState({
                        planetResources: {
                          ...resources,
                          [name.current]: {
                            ...resources[name.current],
                            productionArray: resources[name.current].productionArray,
                          },
                        },
                      });

                      resources[name.current].awaitArray.splice(index, 1);
                      planetStore.setState({
                        planetResources: {
                          ...resources,
                          [name.current]: {
                            ...resources[name.current],
                            awaitArray: resources[name.current].awaitArray,
                          },
                        },
                      });

                      clearTimeout(up);
                      check = false;
                      //setRender(!render);
                      console.log("대기 그림 클릭");
                    }
                  }}>
                  <img
                    className="waitingImage"
                    src={production[item[0]].img}
                    alt={"건물 이미지"}></img>
                  <div className="waitingName">{production[item[0]].name}</div>
                  <div className="waitingTime">
                    {resources[name.current].awaitArray[0][0] === item[0]
                      ? Math.floor((i / resources[name.current].awaitArray[0][1]) * 100) + " %"
                      : "대기 중.."}
                  </div>
                </div>
              ))
            : null}
        </WaitingContainer>
      ) : null} */}
      <WaitingContainer
        num={
          resources[name.current].awaitArray.length !== 0
            ? Math.floor((i / resources[name.current].awaitArray[0][1]) * 100) + "%"
            : null
        }>
        {resources[name.current].awaitArray.length !== 0
          ? resources[name.current].awaitArray.map((item, index) => (
              <div
                className="waiting"
                key={index}
                onClick={() => {
                  if (useStore.getState().name === name.current) {
                    if (resources[name.current].awaitArray[0][0] === item[0]) {
                      i = 0;
                    }
                    resources[name.current].productionArray.push(item[0]);

                    planetStore.setState({
                      planetResources: {
                        ...resources,
                        [name.current]: {
                          ...resources[name.current],
                          productionArray: resources[name.current].productionArray,
                        },
                      },
                    });

                    resources[name.current].awaitArray.splice(index, 1);
                    planetStore.setState({
                      planetResources: {
                        ...resources,
                        [name.current]: {
                          ...resources[name.current],
                          awaitArray: resources[name.current].awaitArray,
                        },
                      },
                    });

                    clearTimeout(up);
                    check = false;
                    //setRender(!render);
                    console.log("대기 그림 클릭");
                  }
                }}>
                <img
                  className="waitingImage"
                  src={production[item[0]].img}
                  alt={"건물 이미지"}></img>
                <div className="waitingName">{production[item[0]].name}</div>
                <div className="waitingTime">
                  {/* {name.current === planetName.name
                    ? resources[name.current].awaitArray[0][0] === item[0]
                      ? Math.floor((i / resources[name.current].awaitArray[0][1]) * 100) + " %"
                      : "대기 중.."
                    : null} */}

                  {resources[name.current].awaitArray[0][0] === item[0]
                    ? Math.floor((i / resources[name.current].awaitArray[0][1]) * 100) + " %"
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
