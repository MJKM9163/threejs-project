import React, { memo } from "react";
import styled from "styled-components";
import { planetStore } from "../../../hooks/stores/planetStore";
import { screenStore } from "../../../hooks/stores/screenStore";
import { useStore } from "../../../hooks/stores/useStore";
import { Production } from "./Production";

const ConstructionContainerDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: ${(props) => (props.indexnum ? 20000 : -5)};
  opacity: ${(props) => (props.indexnum ? 1 : 0)};
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
  const check = screenStore((state) => state.productionControl);

  return (
    <ConstructionContainerDiv indexnum={check}>
      <div className="flexBox">
        <Production allData={allData} />
      </div>
    </ConstructionContainerDiv>
  );
};

export const MemoProductionControl = memo(ProductionControl);
