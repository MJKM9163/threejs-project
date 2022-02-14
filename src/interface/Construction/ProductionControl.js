import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { MemoLeftInfo } from "./LeftInfo";
import { MemoProduction } from "./Production";
import { MemoResources } from "./Resources";

const ConstructionContainerDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: ${(props) => (props.indexnum ? -5 : 200)};
  opacity: ${(props) => (props.indexnum ? 0 : 1)};
  cursor: default;

  .flexBox {
    position: absolute;
    display: flex;
    width: 100%;
    height: 200px;
    bottom: 0px;

    background-color: #24272b13;
  }
`;

export const ProductionControl = () => {
  let allData = screenStore.getState();
  let planetName = useStore.getState().name;
  const resources = planetStore((state) => state.planetResources);

  useEffect(() => {
    screenStore.subscribe(
      (state) => state,
      (state) => {
        allData = state;
      }
    );
  }, []);
  useEffect(() => {
    useStore.subscribe(
      (state) => state.name,
      (state) => {
        planetName = state;
      }
    );
  }, []);

  return (
    <ConstructionContainerDiv
      indexnum={
        resources[planetName]?.hide === undefined
          ? true
          : resources[planetName]?.hide
      }
    >
      <MemoResources />
      <div className="flexBox">
        <MemoLeftInfo planetName={planetName} resources={resources} />
        <MemoProduction
          awaitArray={allData.awaitArray}
          production={allData.production}
          productionArray={allData.productionArray}
        />
      </div>
    </ConstructionContainerDiv>
  );
};

export const MemoProductionControl = memo(ProductionControl);
