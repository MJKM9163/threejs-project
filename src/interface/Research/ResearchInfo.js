import React from "react";
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
  font-family: "Noto Sans KR", sans-serif;
  color: #383838;

  .flexBox {
    display: flex;
    flex-direction: column;

    .description {
      display: flex;
      //justify-content: center;
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
    }
  }
`;

export const ResearchInfo = ({ info, pos, list }) => {
  return (
    <ResearchInfoContainer info={info} pos={pos}>
      <span className="flexBox">
        <span className="description">{list.description}</span>
        <span className="addResources">
          {list?.AddResources["food"] ? (
            <span className="resources" style={{ color: "DarkGreen", borderBottom: "1px solid DarkGreen" }}>
              <img className="inImg" src="images/resources/icons/corn.png" alt="추가 식량" />
              {"+ " + list?.AddResources["food"]}
            </span>
          ) : null}
          {list?.AddResources["gear"] ? (
            <span className="resources" style={{ color: "DarkOrange", borderBottom: "1px solid DarkOrange" }}>
              <img className="inImg" src="images/resources/icons/gear.png" alt="추가 생산력" />
              {"+ " + list?.AddResources["gear"]}
            </span>
          ) : null}
          {list?.AddResources["science"] ? (
            <span className="resources" style={{ color: "DeepSkyBlue", borderBottom: "1px solid DeepSkyBlue" }}>
              <img className="inImg" src="images/resources/icons/flask.png" alt="추가 과학" />
              {"+ " + list?.AddResources["science"]}
            </span>
          ) : null}
        </span>
        <span className="addStructure">추가되는 건축물(예정)</span>
      </span>
    </ResearchInfoContainer>
  );
};
