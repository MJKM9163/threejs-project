import React from "react";
import styled from "styled-components";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";

const PlanetInfoDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.zoom ? "100" : "0")};
  opacity: ${(props) => (props.zoom ? "1" : "0")};
  transition: 0.5s;
  list-style-type: none;
  cursor: default;
`;

const Infodiv = styled.div`
  position: fixed;
  top: 40%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;

  .color-box {
    width: 100%;
    height: 100%;
    background-color: #000000c3;
    border: 1px solid #000000;
  }
`;

const InfoTextBox = styled.div`
  position: absolute;
  font-family: "Noto Sans KR", sans-serif;
  width: 95%;
  height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d3d3d3;
  .type:hover,
  li:hover {
    background-color: #97979742;
    animation: ha 0.8s infinite ease-out alternate;
    @keyframes ha {
      from {
        background-color: #97979742;
      }
      to {
        background-color: #929292ca;
      }
    }
  }

  .name {
    font-size: 32px;
    margin-bottom: 10px;

    .type {
      font-size: 20px;
      color: #ffcc99;
    }
  }
  .explanation {
    width: 100%;
    height: 200px;
    //background-color: #e63232;
    color: #b8b8b8;
    border-bottom: 1px solid;
  }

  .state {
    margin: 5px 0px 10px 0px;
    //background-color: #e63232;

    .develop {
      color: #70ff7c;
    }
    .unDevelop {
      color: #ff3b3b;
    }
    .selectSize,
    .climate {
      color: #ffcc99;
    }
  }

  .special {
    font-size: 24px;
    width: 100%;
    height: 134px;
    border-top: 1px solid;
    //background-color: #e63232;

    li {
      font-size: 16px;
    }

    .positive {
      color: #899eff;
      //background-color: #e63232;
    }
    .negative {
      color: #ff8989;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    //background-color: #e63232;
    button {
      width: 130px;
      height: 60px;
      background-color: #000000c3;
      border: 0;
      cursor: pointer;
      transition: 0.5s;
      font-size: 20px;
      color: #d3d3d3;

      :hover {
        background-color: #383838c3;
        color: white;
      }
    }
    .start {
      :active {
        background-color: #339cffc3;
        transition: 0.1s;
      }
    }

    .cancel {
      :active {
        background-color: #ff3a3ac3;
        transition: 0.1s;
      }
    }
  }
`;

const EffectHover = styled.div`
  position: absolute;
  top: 0px;
  left: -125%;
  width: 450px;
  height: 500px;
  background-color: #252525c1;
  color: white;
  opacity: 1;
  z-index: 5000000;
  display: ${(props) => (props.check ? "block" : "none")};
  outline: 1px solid black;

  .effectHoverD {
    margin: 1px 0px 5px 2px;
  }

  .effectHoverR {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid #97979742;
    padding-top: 5px;

    .icon {
      vertical-align: top;
      margin: 0px 9px 0px 3px;
    }
    .eText {
      margin: 0px 0px 5px 5px;
    }
    .EE {
      margin: 0px 0px 5px 5px;
    }
    .EHF {
      color: #94ff90;
    }
    .EHG {
      color: #ffd45d;
    }
    .EHS {
      color: #88bbff;
    }
    .EHH {
      color: #f6ffa4;
    }
  }
`;

const EffectHoverBox = ({ data, allData }) => {
  const { name, resources, description } = data;
  const effectHoverCheck = screenStore((state) => state.effectHoverCheck);
  return (
    <EffectHover
      check={effectHoverCheck.name === name ? true : false}
      className="effectHoverBox"
      onMouseEnter={() => screenStore.setState({ effectHoverCheck: false })}>
      {allData.map((item, index) => (
        <img
          className="effectImg"
          src={item.img}
          alt={item}
          width="450px"
          height="253px"
          key={"effectImg" + index}
          style={
            item.name === name ? { opacity: "1", zIndex: "100", display: "block" } : { display: "none" }
          }></img>
      ))}
      <div className="effectHoverD">{description}</div>
      <div className="effectHoverR">
        <span className="eText">효과</span>
        {resources.food !== undefined ? (
          <span className="EHF EE" style={resources.food > 0 ? { color: "#82ff82" } : { color: "#ff5757" }}>
            <img
              className="icon"
              src="images/resources/icons/corn.png"
              width={25}
              height={25}
              alt="식량"></img>
            {resources.food} /s
          </span>
        ) : null}
        {resources.gear !== undefined ? (
          <span className="EHG EE" style={resources.gear > 0 ? { color: "#ffd29a" } : { color: "#ff5757" }}>
            <img
              className="icon"
              src="images/resources/icons/gear.png"
              width={25}
              height={25}
              alt="생산력"></img>
            {resources.gear}
          </span>
        ) : null}
        {resources.science !== undefined ? (
          <span
            className="EHS EE"
            style={resources.science > 0 ? { color: "#5fc4ff" } : { color: "#ff5757" }}>
            <img
              className="icon"
              src="images/resources/icons/flask.png"
              width={25}
              height={25}
              alt="과학"></img>
            {resources.science}
          </span>
        ) : null}
        {resources.happiness !== undefined ? (
          <span
            className="EHH EE"
            style={resources.happiness > 0 ? { color: "#f1ffb4" } : { color: "#ff5757" }}>
            <img
              className="icon"
              src="images/resources/icons/happiness.png"
              width={25}
              height={25}
              alt="행복도"></img>
            {resources.happiness}
          </span>
        ) : null}
      </div>
    </EffectHover>
  );
};

const effectOn = (effectData) => {
  for (let pAndn = 0; pAndn < effectData.effect.length; pAndn++) {
    for (let e = 0; e < effectData.effect[pAndn].length; e++) {
      for (let [resourcesName, resourcesValue] of Object.entries(effectData.effect[pAndn][e].resources)) {
        if (resourcesName === "food") {
          planetStore.setState(
            (state) => (state.planetResources[effectData.name].resources[resourcesName] += resourcesValue)
          );
        } else {
          planetStore.setState((state) => (state.allResources[resourcesName] += resourcesValue));
        }
      }
    }
  }
};

let pCost = 0;
export const PlanetInfo = () => {
  const zoom = screenStore((state) => state.zoom);
  const typeData = planetStore.getState().types;
  const planetNameDList = planetStore.getState().explanation;
  const resources = planetStore((state) => state.planetResources);
  const planetData = planetStore((state) => state.selectPlanet);

  return (
    <PlanetInfoDiv zoom={zoom}>
      <Infodiv>
        <InfoTextBox>
          <div className="name">
            {planetData.name}
            &nbsp;<span className="type">{planetData.type}</span>
          </div>
          <div className="explanation">
            {planetData.name in planetNameDList ? planetNameDList[planetData.name] : planetNameDList["etc"]}
          </div>
          <div className="state">
            <li>
              상태: &nbsp;
              <span className={resources[planetData.name] ? "develop" : "unDevelop"}>
                {resources[planetData.name] ? "개척" : "미개척"}
              </span>
            </li>
            <li>
              크기: &nbsp;
              <span className="selectSize">
                {planetData.size >= 550 ? "대형" : planetData.size >= 180 ? "중형" : "소형"}
              </span>
            </li>
            {planetData.main ? null : (
              <li
                onMouseEnter={() => screenStore.setState({ hoverCheck: typeData[planetData.type].climate })}
                onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
                기후: &nbsp;
                <span className="climate">
                  {typeData[planetData.type] ? typeData[planetData.type].climate : null}
                </span>
              </li>
            )}
          </div>
          {planetData.main ? null : (
            <div className="special">
              특이 사항
              <div className="positive">
                {planetData.effect !== undefined
                  ? planetData.effect[0].map((item, index) => (
                      <li
                        key={index}
                        onMouseEnter={() =>
                          screenStore.setState({
                            effectHoverCheck: item,
                          })
                        }
                        onMouseLeave={() => screenStore.setState({ effectHoverCheck: false })}>
                        {item.name}
                        <EffectHoverBox data={item} allData={planetData.effect[0]} />
                      </li>
                    ))
                  : null}
              </div>
              <div className="negative">
                {planetData.effect !== undefined
                  ? planetData.effect[1].map((item, index) => (
                      <li
                        key={index}
                        onMouseEnter={() =>
                          screenStore.setState({
                            effectHoverCheck: item,
                          })
                        }
                        onMouseLeave={() => screenStore.setState({ effectHoverCheck: false })}>
                        {item.name}
                        <EffectHoverBox data={item} allData={planetData.effect[1]} />
                      </li>
                    ))
                  : null}
              </div>
            </div>
          )}
          <div className="buttons" style={{ height: planetData.main ? "430px" : "80px" }}>
            {resources[planetData.name] ? null : (
              <button
                className="start"
                style={{ display: planetData.main ? "none" : "block" }}
                onClick={() => {
                  if (planetStore.getState().allResources.food >= pCost) {
                    planetStore.setState((state) => (state["allResources"]["food"] -= pCost));
                    pCost += 1500;
                    planetStore.setState({
                      planetResources: {
                        ...resources,
                        [planetData.name]: {
                          resources: typeData[planetData.type].resources,
                          develop: true,
                          hide: true,
                        },
                      },
                    });
                    //planetStore.setState((state) => state.planetDurability);
                    effectOn(planetData);
                    screenStore.setState({ zoom: false });
                    screenStore.setState({ orbit: false });
                  }
                }}
                onMouseOver={(e) =>
                  planetStore.getState().allResources.food < pCost
                    ? (e.target.innerText = Math.floor(pCost) + " 식량이 필요!")
                    : null
                }
                onMouseOut={(e) => (e.target.innerText = "개척 시작")}>
                개척 시작
              </button>
            )}
            <button
              className="cancel"
              onClick={() => {
                screenStore.setState({ zoom: false });
                screenStore.setState({ orbit: false });
              }}>
              돌아가기
            </button>
          </div>
        </InfoTextBox>
        <div className="color-box" />
      </Infodiv>
    </PlanetInfoDiv>
  );
};
