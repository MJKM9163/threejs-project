import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { researchStore } from "../../hooks/stores/researchStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { ResearchInfo } from "./ResearchInfo";
import { MemoResearchWarning } from "./ResearchWarning";

const ResearchMapBox = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b9b9b929;
  z-index: ${(props) => (props.check ? 1000000 : -500)};
  opacity: ${(props) => (props.check ? 1 : 0)};
  cursor: default;

  .resourcesInfo {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 200px;
    left: 5%;
    top: 5%;

    background-color: #cac5a587;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    z-index: 1000;

    span {
      width: 150px;
      margin: 5px 0px 5px 10px;
      font-weight: bold;
      font-size: 25px;

      img {
        width: 40px;
        height: 40px;
        vertical-align: top;
      }
    }
  }

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

    .researchName {
      position: absolute;
      bottom: -10px;
      background-color: black;
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
  }
`;

export const ResearchMap = () => {
  const researchMapOnOff = screenStore((state) => state.researchMapOnOff);
  const researchList = researchStore((state) => state.list);
  //const researchResources = researchStore((state) => state.researchResources);
  const researchResources = researchStore.getState().researchResources;
  const completionList = researchStore.getState().completionList;
  const allResources = planetStore.getState().allResources;
  // const planetResources = planetStore.getState().planetResources;
  //const researchList = researchStore.getState().list;

  const ContainerRef = useRef();
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [hovers, setHovers] = useState({
    basicLineColor: ["MintCream", "MintCream"],
    planetSystemLineColor: ["MintCream", "MintCream"],
    largeScaleIndustrializationLineColor: ["MintCream", "MintCream"],
    artificialBacteriaLineColor: ["MintCream", "MintCream"],
    spaceArchitectureLineColor: ["MintCream", "MintCream"],
    xenologyLineColor: ["MintCream", "MintCream"],
  });
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [addStructure, setAddStructure] = useState([]);
  const [list, setList] = useState({ AddResources: { food: 0, gear: 0, science: 0 } });

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDrag(() => true);
    setStartX(e.pageX + ContainerRef.current.scrollLeft);
    setStartY(e.pageY + ContainerRef.current.scrollTop);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDrag(() => false);
  }, []);

  const onDragMove = useCallback(
    (e) => {
      if (isDrag) {
        ContainerRef.current.scrollLeft = startX - e.pageX;
        ContainerRef.current.scrollTop = startY - e.pageY;
      }
    },
    [isDrag]
  );

  console.log("연구창 실행");
  return (
    <ResearchMapBox check={researchMapOnOff}>
      <span className="resourcesInfo">
        <span style={{ color: "DarkGreen", borderBottom: "1px solid DarkGreen" }}>
          <img className="inImg" src="images/resources/icons/corn.png" alt="추가 식량" />
          {" + " + researchResources.food * 2 + "/s"}
        </span>
        <span style={{ color: "DarkOrange", borderBottom: "1px solid DarkOrange" }}>
          <img className="inImg" src="images/resources/icons/gear.png" alt="추가 생산력" />
          {" + " + researchResources.gear}
        </span>
        <span style={{ color: "DeepSkyBlue", borderBottom: "1px solid DeepSkyBlue" }}>
          <img className="inImg" src="images/resources/icons/flask.png" alt="추가 과학" />
          {" + " + researchResources.science}
        </span>
      </span>
      <div
        className="researchMapContainer"
        ref={ContainerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}>
        <ResearchInfo info={info} pos={pos} list={list} addStructure={addStructure} />
        <MemoResearchWarning pos={pos} warning={warning} setWarning={setWarning} message={message} />

        <svg className="basicLine" width={1200} height={1200} viewBox="-50 0 1200 1200">
          <line x1={0} y1={0} x2={300} y2={0} stroke={hovers.basicLineColor[0]} strokeWidth={15} />
          <line x1={-50} y1={200} x2={300} y2={200} stroke={hovers.basicLineColor[0]} strokeWidth={7} />
          <line x1={0} y1={400} x2={300} y2={400} stroke={hovers.basicLineColor[0]} strokeWidth={7} />
          <line x1={0} y1={600} x2={300} y2={600} stroke={hovers.basicLineColor[0]} strokeWidth={7} />
          <line x1={0} y1={796} x2={300} y2={796} stroke={hovers.basicLineColor[0]} strokeWidth={7} />
          <line x1={0} y1={0} x2={0} y2={800} stroke={hovers.basicLineColor[0]} strokeWidth={8} />

          <line x1={300} y1={0} x2={600} y2={0} stroke={hovers.planetSystemLineColor[0]} strokeWidth={15} />
          <line x1={300} y1={50} x2={300} y2={150} stroke={hovers.planetSystemLineColor[1]} strokeWidth={7} name="행+대" />
          <line x1={300} y1={102} x2={500} y2={102} stroke={hovers.planetSystemLineColor[1]} strokeWidth={7} />

          <line
            x1={300}
            y1={200}
            x2={600}
            y2={200}
            stroke={hovers.largeScaleIndustrializationLineColor[0]}
            strokeWidth={7}
          />
          <line
            x1={300}
            y1={250}
            x2={300}
            y2={350}
            stroke={hovers.largeScaleIndustrializationLineColor[1]}
            strokeWidth={7}
            name="대+인"
          />
          <line
            x1={300}
            y1={302}
            x2={500}
            y2={302}
            stroke={hovers.largeScaleIndustrializationLineColor[1]}
            strokeWidth={7}
          />

          <line x1={300} y1={400} x2={600} y2={400} stroke={hovers.artificialBacteriaLineColor[0]} strokeWidth={7} />
          <line
            x1={300}
            y1={450}
            x2={300}
            y2={550}
            stroke={hovers.artificialBacteriaLineColor[1]}
            strokeWidth={7}
            name="인+우"
          />
          <line x1={300} y1={502} x2={500} y2={502} stroke={hovers.artificialBacteriaLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={600} x2={600} y2={600} stroke={hovers.spaceArchitectureLineColor[0]} strokeWidth={7} />
          <line
            x1={300}
            y1={650}
            x2={300}
            y2={750}
            stroke={hovers.spaceArchitectureLineColor[1]}
            strokeWidth={7}
            name="우+외"
          />
          <line x1={300} y1={702} x2={500} y2={702} stroke={hovers.spaceArchitectureLineColor[1]} strokeWidth={7} />

          <line x1={300} y1={800} x2={600} y2={800} stroke={hovers.xenologyLineColor[0]} strokeWidth={7} />
        </svg>

        {Object.keys(researchList).map((item, index, array) => (
          <div className={item} key={item} style={researchList[item].inPos}>
            <img
              src={`images/research/${item}.png`}
              alt={`${item} 이미지`}
              onMouseEnter={(e) => {
                setHovers({
                  ...hovers,
                  [index > 1 ? `${array[index - 1]}LineColor` : null]: ["MintCream", "SandyBrown"],
                  [`${item}LineColor`]: ["Crimson", "SandyBrown"],
                });
                setInfo(true);
                setPos([researchList[item].position[0], researchList[item].position[1]]);
                setList(researchList[item]);
                setAddStructure({ ...researchList[item].AddStructure });
              }}
              onMouseLeave={() => {
                setHovers({
                  ...hovers,
                  [index > 1 ? `${array[index - 1]}LineColor` : null]: ["MintCream", "MintCream"],
                  [`${item}LineColor`]: ["MintCream", "MintCream"],
                });
                setInfo(false);
                setWarning(false);
              }}
              onClick={(e) => {
                if (completionList.includes(item) !== true) {
                  let check = false;
                  for (let researchName of researchList[item].NecessaryResearch) {
                    check = completionList.includes(researchName);
                    if (check !== true) {
                      break;
                    }
                  }
                  if (researchList[item].cost <= allResources.science && check === true) {
                    e.target.parentElement.style.backgroundColor = "#00ce5d";

                    for (let name in researchList[item].AddStructure) {
                      screenStore.getState().resourcesProduction[name].research = true;
                    }
                    researchStore.getState().completionList.push(item);
                    researchStore.setState({
                      researchResources: {
                        ...researchResources,
                        [researchList[item]?.AddResources["food"] ? `food` : null]:
                          researchResources.food + researchList[item].AddResources["food"],
                        [researchList[item]?.AddResources["gear"] ? `gear` : null]:
                          researchResources.gear + researchList[item].AddResources["gear"],
                        [researchList[item]?.AddResources["science"] ? `science` : null]:
                          researchResources.science + researchList[item].AddResources["science"],
                      },
                    });
                  } else if (check !== true) {
                    setMessage("선행 연구가 완료되지 않았습니다!");
                    setWarning(true);
                  } else {
                    setMessage("과학 포인트가 부족합니다!");
                    setWarning(true);
                  }
                }
              }}
            />
            <span className="researchName">{researchList[item].name}</span>
          </div>
        ))}
        <span className="widthAndHeight"></span>
      </div>
    </ResearchMapBox>
  );
};
