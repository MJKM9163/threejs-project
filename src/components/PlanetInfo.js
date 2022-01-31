import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";

const PlanetInfoDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.zoom ? 100 : 0)};
  background-color: ${(props) => (props.zoom ? "#4343437b" : "gray")};
  display: ${(props) => (props.zoom ? "block" : "none")};
  transition: 0.5s;
  list-style-type: none;
`;

const Infodiv = styled.div`
  position: fixed;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;

  .color-box {
    width: 100%;
    height: 100%;
    background-color: #000000c3;
    border: 1px solid #000000;
    //background-color: #ffebb5;
    /* border-radius: 16px;
    box-shadow: inset 0 0 8px #000000; */
  }
`;

const InfoTextBox = styled.div`
  position: absolute;
  font-family: "Noto Sans KR", sans-serif;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 95%;
  height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //text-align: center;
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
  }
`;

export const PlanetInfo = () => {
  //const zoomCheck = useStore((state) => state.zoom);
  const selectSize = useStore((state) => state.selectSize);

  const zoomCheck = useRef(useStore.getState().zoom);
  // const selectSize = useRef(useStore.getState().selectSize);

  const infoName = useRef(useStore.getState().name);
  const typeName = useRef(useStore.getState().type);

  const earthEffect = useRef(useStore.getState().earthEffect);

  useEffect(() => {
    useStore.subscribe((state) => {
      infoName.current = state.name;
    });
    useStore.subscribe((state) => {
      typeName.current = state.type;
    });
    useStore.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
    // useStore.subscribe((state) => {
    //   selectSize.current = state.selectSize;
    // });
    useStore.subscribe((state) => {
      earthEffect.current = state.earthEffect;
    });
  });

  const climate = {
    지구형: "온대",
    얼음형: "한랭",
    주계열성: "없음",
  };

  console.log("info 랜더링 됨");
  //Hallucinated air`
  return (
    <PlanetInfoDiv zoom={zoomCheck.current}>
      <Infodiv>
        <InfoTextBox>
          <div className="name">
            {infoName.current}
            &nbsp;<span className="type">{typeName.current}</span>
          </div>
          <div className="explanation">
            설명 칸 현재까지의 연구에 따르면 약 45억 6천만 년 전에 태양계가 처음
            만들어지기 시작했고, 45억 4천만 년 전쯤에 원시지구라고 할 수 있는
            것이 어느 정도 생성되었으며, 45억 3천만 년 전(대략 태양계 형성 시작
            3천만 년 후)에 원시지구는 최소지름 1만 km 정도에서 화성만 한
            원시행성(가칭 테이아)과 충돌했다. 그리하여 달이 생겼다고 하는 것이
            대충돌설이다. 그리고 26억 년 전에 호기성 생물이 등장.
          </div>
          <div className="state">
            <li>
              상태: &nbsp;<span className="develop">미개척</span>
            </li>
            <li>
              크기: &nbsp;
              <span className="selectSize">
                {selectSize >= 350
                  ? "대형"
                  : selectSize >= 180
                  ? "중형"
                  : "소형"}
              </span>
            </li>
            <li>
              기후: &nbsp;
              <span className="climate">{climate[typeName.current]}</span>
            </li>
          </div>
          <div className="special">
            특이 사항
            <div className="positive">
              {earthEffect.current
                ? earthEffect.current.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : null}
            </div>
          </div>
        </InfoTextBox>
        <div className="color-box" />
      </Infodiv>
    </PlanetInfoDiv>
  );
};
