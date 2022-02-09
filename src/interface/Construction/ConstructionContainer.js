import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";
import { useStore } from "../../hooks/stores/useStore";
import { MemoHover } from "./HoverInfo";
import { MemoLeftInfo } from "./LeftInfo";
import { MemoProduction } from "./Production";
import { MemoResources } from "./Resources";
import { MemoWaiting } from "./Waiting";

const ConstructionContainerDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: 100;
  background-color: #60b2ff16;
  cursor: default;
  /* 
  .resources {
    position: absolute;
    display: flex;
    align-items: center;
    top: -10%;
    width: 50%;
    height: 40px;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 25%;
      height: 100%;
      padding: 0px 10px 0px 10px;
      font-weight: bold;
      transition: 0.3s;
      span {
        font-size: 16px;
        margin-right: 5px;
      }
    }

    div:nth-child(1) {
      color: #aeff9e;
    }
    div:nth-child(2) {
      color: #4b48ff;
    }
    div:nth-child(3) {
      color: #ff0000;
    }
    div:nth-child(4) {
      color: #dd92ff;
    }
  }

  .constructionFlexBox {
    position: absolute;
    display: flex;
    width: 90%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);

    div {
      display: flex;
      flex-direction: column;
    }

    .info {
      width: 25%;

      div {
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .name {
        justify-content: center;
        color: #b8b8b8;
      }

      .food {
        .foodNum {
          font-size: 20px;
          color: #b8b8b8;
        }
      }
      .productivity {
        .productNum {
          font-size: 20px;
          color: #b8b8b8;
        }
      }
      .science {
        .scienceNum {
          font-size: 20px;
          color: #b8b8b8;
        }
      }
    }

    .production::-webkit-scrollbar {
      width: 8px; 
    }

    .production::-webkit-scrollbar-thumb {
      background-color: #424242; 
      border-radius: 50px;
    }

    .production::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.85); 
    }
    .production {
      width: 50%;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: auto;

      .productionInfo {
        position: relative;
        width: 25%;
        height: 50%;
        transition: 0.2s;
        :hover {
          background-color: #ffffff3d;
        }
        :active {
          background-color: #ffffff8d;
        }

        .image {
          position: absolute;
          z-index: -2;
          width: 100%;
          height: 100%;
        }
        .imageName {
          position: absolute;
          width: 100%;
          bottom: 0px;
          background-color: #5353535e;
          color: #b8b8b8;
          height: 25px;
        }
      }
    }

    .waitingContainer {
      width: 25%;

      .waiting {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid yellow;

        .waitingImage {
          z-index: -2;
          width: 160px;
          height: 90px;
        }
        .waitingName {
          color: white;
          font-size: 21px;
        }
        .waitingTime {
          color: white;
        }
      }
    }
  } */
`;

// const Hoverimage = styled.div`
//   font-family: "Noto Sans KR", sans-serif;
//   position: absolute;
//   z-index: 100;
//   left: 10px;
//   top: 5px;
//   width: 450px;
//   height: 250px;

//   div {
//     background-color: #000000c3;
//     width: 100%;
//     color: white;
//   }

//   .imageName {
//     font-size: 20px;
//   }

//   .imageScript {
//     font-size: 15px;
//   }
// `;

let zero = 0;
export const ConstructionContainer = () => {
  const [hoverCheck, setHoverCheck] = useState(false);
  const [render, setRender] = useState(false);
  //const awaitings = screenStore((state) => state.awaitArray);
  //const awaitings = screenStore.getState().awaitArray;
  const allData = useRef(screenStore.getState());
  const planetName = useRef(useStore.getState().name);
  const resources = useRef(planetStore.getState().planetResources);
  const awaitings = useRef(screenStore.getState().awaitArray);

  useEffect(() => {
    screenStore.subscribe(
      (state) => (allData.current = state),
      (state) => state
    );
  }, []);
  useEffect(() => {
    useStore.subscribe(
      (state) => (planetName.current = state.name),
      (state) => state.name
    );
  }, []);
  useEffect(() => {
    planetStore.subscribe(
      (state) => (resources.current = state.planetResources),
      (state) => state.planetResources
    );
  }, []);
  useEffect(() => {
    screenStore.subscribe(
      (state) => (awaitings.current = state.awaitArray),
      (state) => state.awaitArray
    );
  }, []);

  // 20 / 100 = 0.2

  const gearNum = resources.current[planetName.current]?.gear;
  const maxNum = allData.current.production[awaitings.current[0]]?.max;

  console.log("행성 관리창 랜더링");

  return (
    <ConstructionContainerDiv
      onClick={() => {
        setRender(!render);
      }}
    >
      <MemoHover allData={allData.current} />
      <MemoResources />
      <MemoLeftInfo
        planetName={planetName.current}
        resources={resources.current}
      />
      <MemoProduction allData={allData.current} />
      <MemoWaiting awaitings={awaitings.current} />
    </ConstructionContainerDiv>
  );
};

// return (
//   <>
//     {hoverCheck ? (
//       <Hoverimage>
//         <div className="imageName">
//           {allData.current[hoverCheck[0]][hoverCheck[1]].name}
//         </div>
//         {allData.current[hoverCheck[0]][hoverCheck[1]].video ? (
//           <video
//             muted
//             loop
//             autoPlay
//             width={250}
//             height={250}
//             src="images/production/videos/planetCurtain.mp4"
//           ></video>
//         ) : (
//           <img
//             className="imageBox"
//             width={450}
//             height={250}
//             src={allData.current[hoverCheck[0]][hoverCheck[1]].img}
//             alt={"이미지"}
//           ></img>
//         )}

//         <div className="imageScript">
//           {allData.current[hoverCheck[0]][hoverCheck[1]].description}
//         </div>
//       </Hoverimage>
//     ) : null}
//     <ConstructionContainerDiv>
//       <div className="resources">
//         <div
//           onMouseEnter={() => setHoverCheck(["images", "potato"])}
//           onMouseLeave={() => setHoverCheck(false)}
//         >
//           <img
//             src="images/resources/icons/corn.png"
//             width={25}
//             height={25}
//             alt="식량 자원"
//           ></img>
//           <span>275</span>
//         </div>
//         <div
//           onMouseEnter={() => setHoverCheck(["images", "titanium"])}
//           onMouseLeave={() => setHoverCheck(false)}
//         >
//           <img
//             src="images/resources/icons/titanium.png"
//             width={25}
//             height={25}
//             alt="티타늄 자원"
//           ></img>
//           <span>50</span>
//         </div>
//         <div
//           onMouseEnter={() => setHoverCheck(["images", "orichalcon"])}
//           onMouseLeave={() => setHoverCheck(false)}
//         >
//           <img
//             src="images/resources/icons/orichalcon.png"
//             width={25}
//             height={25}
//             alt="오리하르콘 자원"
//           ></img>
//           <span>12</span>
//         </div>
//         <div
//           onMouseEnter={() => setHoverCheck(["images", "science"])}
//           onMouseLeave={() => setHoverCheck(false)}
//         >
//           <img
//             src="images/resources/icons/flask.png"
//             width={25}
//             height={25}
//             alt="과학 자원"
//           ></img>
//           <span>36</span>
//         </div>
//       </div>
//       <div className="constructionFlexBox">
//         <div className="info">
//           <div className="name">{planetName.current}</div>
//           <div
//             className="food"
//             onMouseEnter={() => setHoverCheck(["images", "potato"])}
//             onMouseLeave={() => setHoverCheck(false)}
//           >
//             <img
//               src="images/resources/icons/corn.png"
//               width={25}
//               height={25}
//               alt="생산하는 식량"
//             ></img>
//             <span className="foodNum">
//               {resources.current[planetName.current]?.food}
//             </span>
//           </div>
//           <div
//             className="productivity"
//             onMouseEnter={() => setHoverCheck(["images", "gear"])}
//             onMouseLeave={() => setHoverCheck(false)}
//           >
//             <img
//               src="images/resources/icons/gear.png"
//               width={25}
//               height={25}
//               alt="행성의 생산력"
//             ></img>
//             <span className="productNum">
//               {resources.current[planetName.current]?.gear}
//             </span>
//           </div>
//           <div
//             className="science"
//             onMouseEnter={() => setHoverCheck(["images", "science"])}
//             onMouseLeave={() => setHoverCheck(false)}
//           >
//             <img
//               src="images/resources/icons/flask.png"
//               width={25}
//               height={25}
//               alt="행성의 과학"
//             ></img>
//             <span className="scienceNum">
//               {resources.current[planetName.current]?.science}
//             </span>
//           </div>
//         </div>
//         <div className="production">
//           {allData.current.productionArray.map((item, index) =>
//             allData.current.production[item].research ? (
//               <div
//                 className="productionInfo"
//                 key={index}
//                 onClick={() => {
//                   setRender(!render);
//                   awaitings.current.push(
//                     allData.current.productionArray.splice(
//                       allData.current.productionArray.indexOf(item),
//                       1
//                     )
//                   );
//                 }}
//                 onMouseEnter={() => setHoverCheck(["production", item])}
//                 onMouseLeave={() => setHoverCheck(false)}
//               >
//                 <img
//                   className="image"
//                   src={allData.current.production[item].img}
//                   alt={"건물 이미지"}
//                 ></img>
//                 <div className="imageName">
//                   {allData.current.production[item].name}
//                 </div>
//               </div>
//             ) : null
//           )}
//         </div>
//         <div className="waitingContainer">
//           {awaitings.current.length !== 0
//             ? awaitings.current.map((item, index) => (
//                 <div className="waiting" key={index}>
//                   <img
//                     className="waitingImage"
//                     src={allData.current.production[item].img}
//                     alt={"건물 이미지"}
//                   ></img>
//                   <div className="waitingName">
//                     {allData.current.production[item].name}
//                   </div>
//                   <div className="waitingTime">
//                     <Waiting />
//                   </div>
//                 </div>
//               ))
//             : null}
//         </div>
//       </div>
//     </ConstructionContainerDiv>
//   </>
// );
