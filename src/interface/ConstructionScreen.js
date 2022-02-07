import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imageStore } from "../hooks/stores/imageStore";

const ConstructionContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 200px;
  z-index: 100;
  background-color: gray;

  .resources {
    position: absolute;
    display: flex;
    align-items: center;
    top: -10%;
    width: 50%;
    height: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: default;

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
    //justify-content: space-between;
    outline: 1px solid red;
    width: 90%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);

    div {
      display: flex;
      outline: 1px solid blue;
      flex-direction: column;
    }

    .info {
      width: 25%;
      //flex-grow: 1;
      flex-direction: column;

      div {
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        outline: 1px solid yellow;
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

    .production {
      width: 50%;

      .productionInfo {
        width: 25%;
        height: 50%;
        outline: 1px solid yellow;
      }
    }

    .Waiting {
      width: 25%;

      div {
        width: 100%;
        height: 25%;
        outline: 1px solid yellow;
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
  const foodImage = useRef(imageStore.getState().images);

  useEffect(() => {
    imageStore.subscribe(
      (state) => (foodImage.current = state.images),
      (state) => state.images
    );
  });

  console.log("행성 관리창 랜더링");
  return (
    <>
      {hoverCheck ? (
        <Hoverimage>
          <div className="imageName">{foodImage.current[hoverCheck].name}</div>
          <img
            className="imageBox"
            width={450}
            height={250}
            src={foodImage.current[hoverCheck].img}
            alt={"이미지"}
          ></img>
          <div className="imageScript">
            {foodImage.current[hoverCheck].description}
          </div>
        </Hoverimage>
      ) : null}
      <ConstructionContainer>
        <div className="resources">
          <div
            onMouseEnter={() => setHoverCheck("potato")}
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
            onMouseEnter={() => setHoverCheck("titanium")}
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
            onMouseEnter={() => setHoverCheck("orichalcon")}
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
            onMouseEnter={() => setHoverCheck("science")}
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
            <div className="name">행성 이름</div>
            <div
              className="food"
              onMouseEnter={() => setHoverCheck("potato")}
              onMouseLeave={() => setHoverCheck(false)}
            >
              식량 이미지<span className="foodNum">50</span>
            </div>
            <div
              className="productivity"
              onMouseEnter={() => setHoverCheck("gear")}
              onMouseLeave={() => setHoverCheck(false)}
            >
              생산력 이미지<span className="productNum">12</span>
            </div>
            <div
              className="science"
              onMouseEnter={() => setHoverCheck("science")}
              onMouseLeave={() => setHoverCheck(false)}
            >
              과학 이미지<span className="scienceNum">8</span>
            </div>
          </div>
          <div className="production">
            <div className="productionInfo">
              <div className="image">그림</div>
              <div className="imageName">자기장 발생기</div>
              <div className="needFood">100</div>
            </div>
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
