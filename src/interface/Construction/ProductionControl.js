import React, { memo } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { Production } from "./Production";

const ConstructionContainerDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: ${(props) => (props.indexnum ? -5 : 20000)};
  opacity: ${(props) => (props.indexnum ? 0 : 1)};
  cursor: default;

  .flexBox {
    position: absolute;
    display: flex;
    width: 100%;
    height: 200px;
    bottom: 0px;
    justify-content: center;

    background-color: #24272b13;
  }
`;

export const ProductionControl = () => {
  let allData = screenStore.getState();
  let planetName = useStore.getState().name;
  const resources = planetStore((state) => state.planetResources);

  console.log(" 생산 컨트롤 창");
  return (
    <ConstructionContainerDiv indexnum={resources[planetName]?.hide === undefined ? true : resources[planetName]?.hide}>
      <div className="flexBox">
        <Production allData={allData} />
      </div>
    </ConstructionContainerDiv>
  );
};

export const MemoProductionControl = memo(ProductionControl);
