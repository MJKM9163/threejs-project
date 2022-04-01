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
              <li>
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
                  ? planetData.effect[0].map((item, index) => <li key={index}>{item}</li>)
                  : null}
              </div>
              <div className="negative">
                {planetData.effect !== undefined
                  ? planetData.effect[1].map((item, index) => <li key={index}>{item}</li>)
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
                  planetStore.setState((state) => state.planetDurability);

                  screenStore.setState({ zoom: false });
                  screenStore.setState({ orbit: false });
                }}>
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
