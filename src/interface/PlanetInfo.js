import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { planetStore, useStore } from "../hooks/stores/useStore";
import { effectStore } from "../hooks/stores/effectStore";

const PlanetInfoDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.zoom ? "100" : "0")};
  opacity: ${(props) => (props.zoom ? "1" : "0")};
  /* display: ${(props) => (props.zoom ? "block" : "none")}; */
  transition: 0.5s;
  list-style-type: none;
  .aaa {
    background-color: yellow;
  }
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
  //const selectSize = useStore((state) => state.selectSize);

  // 여러번 랜더링 원인들  ----- ref의 값이 바로 갱신이 안되서 랜더링 하는 방법 채택
  const zoomCheck = useStore((state) => state.zoom);
  const effects = effectStore((state) => state.effects);
  const mainPlanet = useStore((state) => state.mainPlanet);

  // -------

  //const zoomCheck = useRef(useStore.getState().zoom);

  const selectSize = useRef(useStore.getState().selectSize);

  const infoName = useRef(useStore.getState().name);
  const typeName = useRef(useStore.getState().type);

  //const mainPlanet = useRef(useStore.getState().mainPlanet);
  const explanation = useRef(planetStore.getState().explanation);

  useEffect(() => {
    useStore.subscribe(
      (state) => (infoName.current = state.name),
      (state) => state.name
    );
  }, [infoName]);

  useEffect(() => {
    useStore.subscribe(
      (state) => (typeName.current = state.type),
      (state) => state.type
    );
  }, [typeName]);

  useEffect(() => {
    useStore.subscribe(
      (state) => (selectSize.current = state.selectSize),
      (state) => state.selectSize
    );
  }, [selectSize]);

  useEffect(() => {
    planetStore.subscribe(
      (state) => (explanation.current = state.explanation),
      (state) => state.explanation
    );
  }, [explanation]);

  // useEffect(() => {
  //   useStore.subscribe(
  //     (state) => (zoomCheck.current = state.zoom),
  //     (state) => state.zoomCheck
  //   );
  // }, [zoomCheck]);

  // useEffect(() => {
  //   useStore.subscribe(
  //     (state) => (mainPlanet.current = state.mainPlanet),
  //     (state) => state.mainPlanet
  //   );
  // });

  // useEffect(() => {
  //   effectStore.subscribe(
  //     (state) => (effects.current = state.effects),
  //     (state) => console.log("22", state)
  //   );
  // });

  const climate = {
    지구형: "온대",
    얼음형: "한랭",
    주계열성: "없음",
  };

  console.log("info 랜더링 됨");
  return (
    <PlanetInfoDiv zoom={zoomCheck}>
      <Infodiv>
        <InfoTextBox>
          <div className="name">
            {infoName.current}
            &nbsp;<span className="type">{typeName.current}</span>
          </div>
          <div className="explanation">
            {infoName.current in explanation.current
              ? explanation.current[infoName.current]
              : explanation.current["etc"]}
          </div>
          <div className="state">
            <li>
              상태: &nbsp;<span className="develop">미개척</span>
            </li>
            <li>
              크기: &nbsp;
              <span className="selectSize">
                {selectSize.current >= 550
                  ? "대형"
                  : selectSize.current >= 180
                  ? "중형"
                  : "소형"}
              </span>
            </li>
            {mainPlanet ? null : (
              <li>
                기후: &nbsp;
                <span className="climate">{climate[typeName.current]}</span>
              </li>
            )}
          </div>
          {mainPlanet ? null : (
            <div className="special">
              특이 사항
              <div className="positive">
                {effects
                  ? effects[0].map((item, index) => <li key={index}>{item}</li>)
                  : null}
              </div>
              <div className="negative">
                {effects
                  ? effects[1].map((item, index) => <li key={index}>{item}</li>)
                  : null}
              </div>
            </div>
          )}
          <div
            className="buttons"
            style={{ height: mainPlanet ? "430px" : "80px" }}
          >
            <button
              className="start"
              style={{ display: mainPlanet ? "none" : "block" }}
            >
              개척 시작
            </button>
            <button
              className="cancel"
              onClick={() => {
                useStore.setState({ zoom: false });
                useStore.setState({ orbitHide: false });

                if (mainPlanet === true) {
                  setTimeout(() => {
                    useStore.setState({ mainPlanet: false });
                  }, 500);
                }
              }}
            >
              돌아가기
            </button>
          </div>
        </InfoTextBox>
        <div className="color-box" />
      </Infodiv>
    </PlanetInfoDiv>
  );
};
