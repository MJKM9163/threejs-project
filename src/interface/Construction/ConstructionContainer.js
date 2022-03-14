import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";
import { MemoProductionControl } from "./ProductionControl";

const HoverInfoContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  //z-index: 100;
  opacity: ${(props) => (props.hoverCheck ? 1 : 0)};
  z-index: ${(props) => (props.hoverCheck ? 100 : -2000000)};

  top: 0px;
  left: 0px;

  width: 450px;
  height: 250px;

  div {
    background-color: #000000c3;
    width: 100%;
    color: white;
  }

  .imageName {
    font-size: 20px;
  }

  .imageScript {
    font-size: 15px;
  }

  .sprite {
    background-image: url("images/RRC.png");
    background-repeat: no-repeat;
    display: block;
    width: 450px;
    height: 253px;
  }

  .sprite-adjustingTheAtmosphere {
    background-position: -5px -5px;
  }

  .sprite-biologicalDetector {
    background-position: -465px -5px;
  }

  .sprite-combinationOfAtmosphericElements {
    background-position: -925px -5px;
  }

  .sprite-defenseSatellite {
    background-position: -5px -268px;
  }

  .sprite-dustExtractor {
    background-position: -465px -268px;
  }

  .sprite-exploration {
    background-position: -925px -268px;
  }

  .sprite-explorationOfSpace {
    background-position: -5px -531px;
  }

  .sprite-friendlyGeneticManipulation {
    background-position: -465px -531px;
  }

  .sprite-gear {
    background-position: -925px -531px;
  }

  .sprite-magneticFieldGenerator {
    background-position: -5px -794px;
  }

  .sprite-multipurposeSatellite {
    background-position: -465px -794px;
  }

  .sprite-orichalcon {
    background-position: -925px -794px;
  }

  .sprite-planetCurtain {
    background-position: -5px -1057px;
  }

  .sprite-planetResearchInstitute {
    background-position: -465px -1057px;
  }

  .sprite-planetTourismFacilities {
    background-position: -925px -1057px;
  }

  .sprite-planetTrade {
    background-position: -5px -1320px;
  }

  .sprite-potato {
    background-position: -465px -1320px;
  }

  .sprite-reactorCatalyst {
    background-position: -925px -1320px;
  }

  .sprite-science {
    background-position: -1385px -5px;
  }

  .sprite-titanium {
    background-position: -1385px -268px;
  }

  .sprite-titaniumAlloy {
    background-position: -1385px -531px;
  }
`;

export const ConstructionContainer = () => {
  let allData = screenStore.getState();
  const hoverCheck = screenStore((state) => state.hoverCheck);
  //const hoverCheck = screenStore.getState().hoverCheck;
  //const imagesMemo = useMemo(() => url("images/RRC.png"),[])
  //const [hover, setHover] = useState(false);
  //const resources = planetStore((state) => state.planetResources);

  // useEffect(() => {
  //   screenStore.subscribe(
  //     (state) => state,
  //     (state) => {
  //       allData = state;
  //     }
  //   );
  // }, []);
  console.log(hoverCheck);
  console.log("행성 관리창 랜더링");
  return (
    <>
      {/* {hoverCheck ? ( */}
      <HoverInfoContainer hoverCheck={hoverCheck !== false ? true : false}>
        <div className="imageName">{allData.resourcesProduction[hoverCheck === false ? "potato" : hoverCheck].name}</div>
        <div className={`${"sprite sprite-" + hoverCheck}`}></div>
        <img
          className="imageBox"
          //width={450}
          //height={250}
          src={allData.resourcesProduction["potato"].img}
          alt={"이미지"}></img>
        {/* {allData[hoverCheck[0]][hoverCheck[1]].video ? (
            <video muted loop autoPlay width={250} height={250} src={allData[hoverCheck[0]][hoverCheck[1]].video}></video>
          ) : (
            <img
              className="imageBox"
              //width={450}
              //height={250}
              src={allData[hoverCheck[0]][hoverCheck[1]].img}
              alt={"이미지"}></img>
          )} */}

        <div className="imageScript">
          {allData.resourcesProduction[hoverCheck === false ? "potato" : hoverCheck].description}
        </div>
      </HoverInfoContainer>
      {/* ) : null} */}
      <MemoProductionControl />
    </>
  );
};
