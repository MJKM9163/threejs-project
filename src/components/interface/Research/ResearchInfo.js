import React, { memo } from "react";
import styled from "styled-components";

const ResearchInfoContainer = styled.span`
  display: ${(props) => (props.info ? "block" : "none")};
  position: absolute;
  width: 300px;

  top: ${(props) => props.pos[0] + 150 + "px"};
  left: ${(props) => props.pos[1] - 85 + "px"};
  background-color: Bisque;
  outline: 1px solid black;
  z-index: 1500;
  opacity: 0.9;
  color: #383838;

  .flexBox {
    display: flex;
    flex-direction: column;

    .description {
      display: flex;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid RosyBrown;
    }
    .addResources {
      display: flex;
      margin-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid RosyBrown;

      .resources {
        margin-left: 5px;
        font-weight: bold;
      }

      img {
        width: 25px;
        height: 25px;
        margin-right: 7px;
        vertical-align: top;
      }
    }
    .addStructure {
      display: flex;
      margin-left: 5px;
      flex-direction: column;

      .text {
        color: black;
        font-weight: bold;
      }
      .item {
        color: #7b7bff;
      }
    }
  }
`;

export const ResearchInfo = ({ info, pos, list, addStructure }) => {
  console.log("연구 인포");
  return (
    <ResearchInfoContainer info={info} pos={pos}>
      <span className="flexBox">
        <span className="description">{list.description}</span>
        <span className="addResources">
          <span
            className="resources"
            style={
              list?.AddResources["food"]
                ? { color: "DarkGreen", borderBottom: "1px solid DarkGreen" }
                : { position: "absolute", opacity: "0" }
            }>
            <img className="inImg" src="images/resources/icons/corn.png" alt="추가 식량" />
            {list?.AddResources["food"] ? "+ " + list?.AddResources["food"] : null}
          </span>
          <span
            className="resources"
            style={
              list?.AddResources["gear"]
                ? { color: "DarkOrange", borderBottom: "1px solid DarkOrange" }
                : { position: "absolute", opacity: "0" }
            }>
            <img className="inImg" src="images/resources/icons/gear.png" alt="추가 생산력" />
            {list?.AddResources["gear"] ? "+ " + list?.AddResources["gear"] : null}
          </span>
          <span
            className="resources"
            style={
              list?.AddResources["science"]
                ? { color: "DeepSkyBlue", borderBottom: "1px solid DeepSkyBlue" }
                : { position: "absolute", opacity: "0" }
            }>
            <img className="inImg" src="images/resources/icons/flask.png" alt="추가 과학" />
            {list?.AddResources["science"] ? "+ " + list?.AddResources["science"] : null}
          </span>
        </span>
        <span className="addStructure">
          <span className="text">추가되는 건물</span>
          {Object.values(addStructure).map((item, index) => (
            <span key={item[1] + index} className="item">
              {item}
            </span>
          ))}
        </span>
      </span>
    </ResearchInfoContainer>
  );
};

export const MemoResearchInfo = memo(ResearchInfo);
