import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { screenStore } from "../hooks/stores/screenStore";
import { useStore } from "../hooks/stores/useStore";

const ConstructionContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: 100;
  background-color: #ffffff14;
  cursor: default;

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
      background: #91ff912e;
      :hover {
        color: #f3f3f3;
        background: #91ff916a;
      }
    }
    div:nth-child(2) {
      color: #4b48ff;
      background: #0400ff1f;
      :hover {
        color: #f3f3f3;
        background: #0400ff7a;
      }
    }
    div:nth-child(3) {
      color: #ff0000;
      background: #ff000044;
      :hover {
        color: #f3f3f3;
        background: #ff000086;
      }
    }
    div:nth-child(4) {
      color: #dd92ff;
      background: #ae00ff21;
      :hover {
        color: #f3f3f3;
        background: #ae00ff7a;
      }
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
        background-color: #7e967e81;
      }

      .food {
        background-color: #8aff8a;
        .foodNum {
          font-size: 20px;
          text-align: center;
        }
      }
      .productivity {
        background-color: #ff9844;
        .productNum {
          font-size: 20px;
        }
      }
      .science {
        background-color: #1d65ff;
        .scienceNum {
          font-size: 20px;
        }
      }
    }

    .production::-webkit-scrollbar {
      width: 8px; /*스크롤바의 너비*/
    }

    .production::-webkit-scrollbar-thumb {
      background-color: #424242; /*스크롤바의 색상*/
      border-radius: 50px;
    }

    .production::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.85); /*스크롤바 트랙 색상*/
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

    .Waiting {
      width: 25%;

      div {
        width: 100%;
        height: 25%;
        border-bottom: 1px solid yellow;
      }
    }
  }
`;

const Hoverimage = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  z-index: 100;
  left: 10px;
  top: 5px;
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
`;

export const ConstructionScreen = () => {
  const [hoverCheck, setHoverCheck] = useState(false);
  const allData = useRef(screenStore.getState());
  const planetName = useRef(useStore.getState().name);

  useEffect(() => {
    screenStore.subscribe(
      (state) => (allData.current = state),
      (state) => state
    );
  });
  useEffect(() => {
    useStore.subscribe(
      (state) => (planetName.current = state.name),
      (state) => state.name
    );
  });

  console.log("행성 관리창 랜더링");
  return (
    <>
      {hoverCheck ? (
        <Hoverimage>
          <div className="imageName">
            {allData.current[hoverCheck[0]][hoverCheck[1]].name}
          </div>
          {allData.current[hoverCheck[0]][hoverCheck[1]].video ? (
            <video
              muted
              loop
              autoPlay
              width={250}
              height={250}
              src="images/production/videos/planetCurtain.mp4"
            ></video>
          ) : (
            <img
              className="imageBox"
              width={450}
              height={250}
              src={allData.current[hoverCheck[0]][hoverCheck[1]].img}
              alt={"이미지"}
            ></img>
          )}

          <div className="imageScript">
            {allData.current[hoverCheck[0]][hoverCheck[1]].description}
          </div>
        </Hoverimage>
      ) : null}
      <ConstructionContainer>
        <div className="resources">
          <div
            onMouseEnter={() => setHoverCheck(["images", "potato"])}
            onMouseLeave={() => setHoverCheck(false)}
          >
            <img
              src="images/resources/icons/corn.png"
              width={25}
              height={25}
              alt="식량 자원"
            ></img>
            <span>275</span>
          </div>
          <div
            onMouseEnter={() => setHoverCheck(["images", "titanium"])}
            onMouseLeave={() => setHoverCheck(false)}
          >
            <img
              src="images/resources/icons/titanium.png"
              width={25}
              height={25}
              alt="티타늄 자원"
            ></img>
            <span>50</span>
          </div>
          <div
            onMouseEnter={() => setHoverCheck(["images", "orichalcon"])}
            onMouseLeave={() => setHoverCheck(false)}
          >
            <img
              src="images/resources/icons/orichalcon.png"
              width={25}
              height={25}
              alt="오리하르콘 자원"
            ></img>
            <span>12</span>
          </div>
          <div
            onMouseEnter={() => setHoverCheck(["images", "science"])}
            onMouseLeave={() => setHoverCheck(false)}
          >
            <img
              src="images/resources/icons/flask.png"
              width={25}
              height={25}
              alt="과학 자원"
            ></img>
            <span>36</span>
          </div>
        </div>
        <div className="constructionFlexBox">
          <div className="info">
            <div className="name">{planetName.current}</div>
            <div
              className="food"
              onMouseEnter={() => setHoverCheck(["images", "potato"])}
              onMouseLeave={() => setHoverCheck(false)}
            >
              <img
                src="images/resources/icons/corn.png"
                width={25}
                height={25}
                alt="생산하는 식량"
              ></img>
              <span className="foodNum">50</span>
            </div>
            <div
              className="productivity"
              onMouseEnter={() => setHoverCheck(["images", "gear"])}
              onMouseLeave={() => setHoverCheck(false)}
            >
              <img
                src="images/resources/icons/gear.png"
                width={25}
                height={25}
                alt="행성의 생산력"
              ></img>
              <span className="productNum">12</span>
            </div>
            <div
              className="science"
              onMouseEnter={() => setHoverCheck(["images", "science"])}
              onMouseLeave={() => setHoverCheck(false)}
            >
              <img
                src="images/resources/icons/flask.png"
                width={25}
                height={25}
                alt="행성의 과학"
              ></img>
              <span className="scienceNum">8</span>
            </div>
          </div>
          <div className="production">
            {allData.current.productionArray.map((item, index) =>
              allData.current.production[item].research ? (
                <div
                  className="productionInfo"
                  key={index}
                  onMouseEnter={() => setHoverCheck(["production", item])}
                  onMouseLeave={() => setHoverCheck(false)}
                >
                  <img
                    className="image"
                    src={allData.current.production[item].img}
                    alt={"건물 이미지"}
                  ></img>
                  <div className="imageName">
                    {allData.current.production[item].name}
                  </div>
                  {/* <div className="needMax">
                    {allData.current.production[item].max}
                  </div> */}
                </div>
              ) : null
            )}
          </div>
          <div className="Waiting">
            <div>대기 1</div>
            <div>대기 2</div>
            <div>대기 3</div>
          </div>
        </div>
      </ConstructionContainer>
    </>
  );
};
