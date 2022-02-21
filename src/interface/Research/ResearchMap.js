import React, { useRef, useState } from "react";
import styled from "styled-components";
import { researchStore } from "../../hooks/stores/researchStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { ResearchInfo } from "./ResearchInfo";

const ResearchMapBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b9b9b929;
  z-index: ${(props) => (props.check ? 1000 : -500)};
  opacity: ${(props) => (props.check ? 1 : 0)};
  cursor: default;

  .researchMapContainer {
    position: absolute;
    width: 90vw;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4981966a;
    overflow: auto;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #00212b;
      color: #d3d3d3;
      ::before {
        position: absolute;
        width: 110px;
        height: 20px;
        background-color: black;
        text-align: center;
        bottom: -20px;
      }
    }
    img:not(.inImg) {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #8cd8e9;
      color: #d3d3d3;
    }

    .widthAndHeight {
      position: absolute;
      width: 2200px;
      height: 1500px;
      z-index: -1000;
    }

    .basicLine {
      position: absolute;
      top: 115px;
      left: 320px;
      line {
        transition: 0.3s;
      }
    }

    .basic {
      top: 250px;
      left: 195px;
      background-color: #00ce5d;
      ::before {
        content: "시스템 활성화";
      }
    }

    .PlanetSystem {
      top: 55px;
      left: 605px;
      ::before {
        content: "행성 시스템";
      }
    }
    .LargeScaleIndustrialization {
      top: 250px;
      left: 605px;
      ::before {
        content: "대규모 산업화";
      }
    }
    .ArtificialBacteria {
      top: 450px;
      left: 605px;
      ::before {
        content: "인공 박테리아";
      }
    }
    .SpaceArchitecture {
      top: 650px;
      left: 605px;
      ::before {
        content: "우주 건축";
      }
    }
    .Xenology {
      top: 850px;
      left: 605px;
      ::before {
        content: "외계학";
      }
    }
    .SatelliteBoundarySystem {
      top: 55px;
      left: 955px;
      ::before {
        content: "위성 경계 체계";
      }
    }
    .InterplanetaryTrade {
      top: 150px;
      left: 805px;
      ::before {
        content: "행선간 교역";
      }
    }
    .TitaniumAlloy {
      top: 250px;
      left: 955px;
      ::before {
        content: "티타늄 합금";
      }
    }
  }
`;

export const ResearchMap = () => {
  const researchMapOnOff = screenStore((state) => state.researchMapOnOff);
  const researchList = researchStore.getState().list;

  const ContainerRef = useRef();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [hovers, setHovers] = useState({
    basicLineColor: "MintCream",
    planetLineColor: ["MintCream", "MintCream"],
    largeLineColor: ["MintCream", "MintCream"],
    bacteriaLineColor: ["MintCream", "MintCream"],
    SpaceLineColor: ["MintCream", "MintCream"],
    XenoLineColor: "MintCream",
  });
  const [info, setInfo] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [list, setList] = useState({ AddResources: { food: 0, gear: 0, science: 0 } });

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + ContainerRef.current.scrollLeft);
    setStartY(e.pageY + ContainerRef.current.scrollTop);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      ContainerRef.current.scrollLeft = startX - e.pageX;
      ContainerRef.current.scrollTop = startY - e.pageY;
    }
  };

  return (
    <ResearchMapBox check={researchMapOnOff}>
      <div
        className="researchMapContainer"
        ref={ContainerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}>
        <ResearchInfo info={info} pos={pos} list={list} />
        <svg className="basicLine" width={1200} height={1200} viewBox="-50 0 1200 1200">
          <line x1={0} y1={0} x2={300} y2={0} stroke={hovers.basicLineColor} strokeWidth={15} />
          <line x1={-50} y1={200} x2={300} y2={200} stroke={hovers.basicLineColor} strokeWidth={7} />
          <line x1={0} y1={400} x2={300} y2={400} stroke={hovers.basicLineColor} strokeWidth={7} />
          <line x1={0} y1={600} x2={300} y2={600} stroke={hovers.basicLineColor} strokeWidth={7} />
          <line x1={0} y1={796} x2={300} y2={796} stroke={hovers.basicLineColor} strokeWidth={7} />
          <line x1={0} y1={0} x2={0} y2={800} stroke={hovers.basicLineColor} strokeWidth={8} />

          <line x1={300} y1={0} x2={600} y2={0} stroke={hovers.planetLineColor[0]} strokeWidth={15} />
          <line x1={300} y1={50} x2={300} y2={150} stroke={hovers.planetLineColor[1]} strokeWidth={7} name="행+대" />
          <line x1={300} y1={102} x2={500} y2={102} stroke={hovers.planetLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={200} x2={600} y2={200} stroke={hovers.largeLineColor[0]} strokeWidth={7} />
          <line x1={300} y1={250} x2={300} y2={350} stroke={hovers.largeLineColor[1]} strokeWidth={7} name="대+인" />
          <line x1={300} y1={302} x2={500} y2={302} stroke={hovers.largeLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={400} x2={600} y2={400} stroke={hovers.bacteriaLineColor[0]} strokeWidth={7} />
          <line x1={300} y1={450} x2={300} y2={550} stroke={hovers.bacteriaLineColor[1]} strokeWidth={7} name="인+우" />
          <line x1={300} y1={502} x2={500} y2={502} stroke={hovers.bacteriaLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={600} x2={600} y2={600} stroke={hovers.SpaceLineColor[0]} strokeWidth={7} />
          <line x1={300} y1={650} x2={300} y2={750} stroke={hovers.SpaceLineColor[1]} strokeWidth={7} name="우+외" />
          <line x1={300} y1={702} x2={500} y2={702} stroke={hovers.SpaceLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={800} x2={600} y2={800} stroke={hovers.XenoLineColor} strokeWidth={7} />
        </svg>
        <div className="basic">
          <img
            src="images/research/basic.png"
            alt="시스템 이미지"
            name="Basic"
            onMouseEnter={(e) => {
              setHovers({ ...hovers, basicLineColor: "Crimson" });
              setInfo(true);
              setPos([250, 195]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({ ...hovers, basicLineColor: "MintCream" });
              setInfo(false);
            }}></img>
        </div>
        <div className="PlanetSystem">
          <img
            src="images/research/planetSystem.png"
            alt="행성 시스템 이미지"
            name="PlanetSystem"
            onMouseEnter={(e) => {
              setHovers({ ...hovers, planetLineColor: ["Crimson", "SandyBrown"] });
              setInfo(true);
              setPos([55, 605]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({ ...hovers, planetLineColor: ["MintCream", "MintCream"] });
              setInfo(false);
            }}></img>
        </div>
        <div className="LargeScaleIndustrialization">
          <img
            src="images/research/largeScaleIndustrialization.png"
            alt="대규모 산업화 이미지"
            name="LargeScaleIndustrialization"
            onMouseEnter={(e) => {
              setHovers({
                ...hovers,
                planetLineColor: ["MintCream", "SandyBrown"],
                largeLineColor: ["Crimson", "SandyBrown"],
              });
              setInfo(true);
              setPos([255, 605]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({
                ...hovers,
                planetLineColor: ["MintCream", "MintCream"],
                largeLineColor: ["MintCream", "MintCream"],
              });
              setInfo(false);
            }}></img>
        </div>
        <div className="ArtificialBacteria">
          <img
            src="images/research/artificialBacteria.png"
            alt="인공 박테리아 이미지"
            name="ArtificialBacteria"
            onMouseEnter={(e) => {
              setHovers({
                ...hovers,
                largeLineColor: ["MintCream", "SandyBrown"],
                bacteriaLineColor: ["Crimson", "SandyBrown"],
              });
              setInfo(true);
              setPos([450, 605]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({
                ...hovers,
                largeLineColor: ["MintCream", "MintCream"],
                bacteriaLineColor: ["MintCream", "MintCream"],
              });
              setInfo(false);
            }}></img>
        </div>
        <div className="SpaceArchitecture">
          <img
            src="images/research/spaceArchitecture.png"
            alt="우주 건축 이미지"
            name="SpaceArchitecture"
            onMouseEnter={(e) => {
              setHovers({
                ...hovers,
                bacteriaLineColor: ["MintCream", "SandyBrown"],
                SpaceLineColor: ["Crimson", "SandyBrown"],
              });
              setInfo(true);
              setPos([650, 605]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({
                ...hovers,
                bacteriaLineColor: ["MintCream", "MintCream"],
                SpaceLineColor: ["MintCream", "MintCream"],
              });
              setInfo(false);
            }}></img>
        </div>
        <div className="Xenology">
          <img
            src="images/research/xenology.png"
            alt="외계학 이미지"
            name="Xenology"
            onMouseEnter={(e) => {
              setHovers({
                ...hovers,
                SpaceLineColor: ["MintCream", "SandyBrown"],
                XenoLineColor: "Crimson",
              });
              setInfo(true);
              setPos([850, 605]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setHovers({
                ...hovers,
                SpaceLineColor: ["MintCream", "MintCream"],
                XenoLineColor: "MintCream",
              });
              setInfo(false);
            }}></img>
        </div>
        <div className="SatelliteBoundarySystem">
          <img
            src="images/research/satelliteBoundarySystem.png"
            alt="위성 경계 체계 이미지"
            name="SatelliteBoundarySystem"
            onMouseEnter={(e) => {
              setInfo(true);
              setPos([55, 955]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setInfo(false);
            }}></img>
        </div>
        <div className="InterplanetaryTrade">
          <img
            src="images/research/interplanetaryTrade.png"
            alt="행성간 교역 이미지"
            name="InterplanetaryTrade"
            onMouseEnter={(e) => {
              setInfo(true);
              setPos([150, 805]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setInfo(false);
            }}></img>
        </div>
        <div className="TitaniumAlloy">
          <img
            src="images/research/titaniumAlloy.png"
            alt="티타늄 합금 이미지"
            name="TitaniumAlloy"
            onMouseEnter={(e) => {
              setInfo(true);
              setPos([250, 955]);
              setList(researchList[e.target.name]);
            }}
            onMouseLeave={() => {
              setInfo(false);
            }}></img>
        </div>

        {/* <div className="OrichalconAlloy">오리하르콘 합금</div>
        <div className="DysonSphere">다이슨 구</div>
        <div className="InsightSense">천리안 감지</div> */}

        <span className="widthAndHeight"></span>
      </div>
    </ResearchMapBox>
  );
};
