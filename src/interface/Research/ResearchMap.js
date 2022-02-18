import React, { useRef, useState } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

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
      :after,
      :before {
        content: "";
        position: absolute;
        border-top: 7px solid;
        border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
        border-image-slice: 1;
        opacity: 0.3;
        z-index: -10;
      }
    }

    .widthAndHeight {
      position: absolute;
      width: 2200px;
      height: 1500px;
      z-index: -1000;
    }

    .basic {
      top: 200px;
      left: 195px;
      :after {
        width: 500px;
        margin-top: -30px;
        margin-left: 550px;
        transform: rotate(-4deg);
      }
      :hover:after {
        animation: basicAfter 0.5s infinite alternate;
        @keyframes basicAfter {
          100% {
            opacity: 1;
          }
        }
      }
      :before {
        width: 450px;
        margin-top: 200px;
        margin-left: 350px;
        transform: rotate(27deg);
      }
      :hover:before {
        animation: basicBefore 0.5s infinite alternate;
        @keyframes basicBefore {
          100% {
            opacity: 1;
          }
        }
      }
    }

    .PlanetSystem {
      top: 170px;
      left: 750px;
      :after {
        width: 500px;
        margin-top: -150px;
        margin-left: 550px;
        transform: rotate(-15deg);
      }
      :hover:after {
        animation: PlanetSystemAfter 0.5s infinite alternate;
        @keyframes PlanetSystemAfter {
          100% {
            opacity: 1;
          }
        }
      }
      :before {
        width: 300px;
        margin-top: 150px;
        margin-left: 350px;
        transform: rotate(20deg);
      }
      :hover:before {
        animation: PlanetSystemBefore 0.5s infinite alternate;
        @keyframes PlanetSystemBefore {
          100% {
            opacity: 1;
          }
        }
      }
    }

    .LargeScaleIndustrialization {
      top: 420px;
      left: 605px;
      :after {
        width: 400px;
        margin-top: -100px;
        margin-left: 500px;
        transform: rotate(-12deg);
      }
      :hover:after {
        animation: LargeScaleIndustrializationAfter 0.5s infinite alternate;
        @keyframes LargeScaleIndustrializationAfter {
          100% {
            opacity: 1;
          }
        }
      }
      :before {
        width: 350px;
        margin-top: 280px;
        margin-left: -320px;
        transform: rotate(138deg);
      }
      :hover:before {
        animation: LargeScaleIndustrializationAfter 0.5s infinite alternate;
        @keyframes LargeScaleIndustrializationAfter {
          100% {
            opacity: 1;
          }
        }
      }
    }

    .ArtificialBacteria {
      top: 720px;
      left: 275px;
    }

    .AlienArchitecture {
      top: 320px;
      left: 1105px;
    }
  }
`;

export const ResearchMap = () => {
  const researchMapOnOff = screenStore((state) => state.researchMapOnOff);

  const ContainerRef = useRef();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();

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
        <div className="basic">시스템 활성화</div>
        <div className="PlanetSystem">행성 시스템</div>
        <div className="LargeScaleIndustrialization">대규모 산업화</div>
        <div className="ArtificialBacteria">인공 박테리아</div>

        <div className="AlienArchitecture">외계 건축</div>

        <span className="widthAndHeight"></span>
      </div>
    </ResearchMapBox>
  );
};
