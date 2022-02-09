import React, { memo, useRef } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const HoverInfoConainer = styled.div`
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

export const HoverInfo = (props) => {
  console.log("호버 정보창 랜더링");
  const hoverCheck = screenStore((state) => state.hoverCheck);
  console.log(hoverCheck);
  console.log(props.allData);
  return (
    <>
      {hoverCheck ? (
        <HoverInfoConainer>
          <div className="imageName">
            {props.allData[hoverCheck[0]][hoverCheck[1]].name}
          </div>
          {props.allData[hoverCheck[0]][hoverCheck[1]].video ? (
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
              src={props.allData[hoverCheck[0]][hoverCheck[1]].img}
              alt={"이미지"}
            ></img>
          )}

          <div className="imageScript">
            {props.allData[hoverCheck[0]][hoverCheck[1]].description}
          </div>
        </HoverInfoConainer>
      ) : null}
    </>
  );
};

export const MemoHover = memo(HoverInfo);
