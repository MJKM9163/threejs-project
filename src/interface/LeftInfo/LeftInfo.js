import React, { memo } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";
import { screenStore } from "../../hooks/stores/screenStore";

const LeftInfoContainer = styled.div`
  cursor: default;
  div {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    font-size: 18px;
  }

  .food {
    .foodNum {
      margin-right: 15px;
    }
  }
  .productivity {
    .productNum {
      margin-right: 15px;
    }
  }
  .science {
    .scienceNum {
      margin-right: 15px;
    }
  }
`;

export const LeftInfo = (props) => {
  const resources = planetStore((state) => state.planetResources);

  console.log("왼쪽 정보창 랜더링");
  return (
    <LeftInfoContainer>
      <div className="name">{props.planet}</div>
      <div
        className="food"
        onMouseEnter={() => screenStore.setState({ hoverCheck: "potato" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/corn.png" width={25} height={25} alt="생산하는 식량"></img>
        <span className="foodNum">
          {resources[props.planet]?.resources.food ? resources[props.planet]?.resources.food : 0}
        </span>
      </div>
      {/* <div
        className="productivity"
        onMouseEnter={() => screenStore.setState({ hoverCheck: "gear" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/gear.png" width={25} height={25} alt="행성의 생산력"></img>
        <span className="productNum">
          {resources[props.planet]?.resources.gear ? resources[props.planet]?.resources.gear : 0}
        </span>
      </div>
      <div
        className="science"
        onMouseEnter={() => screenStore.setState({ hoverCheck: "science" })}
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}>
        <img src="images/resources/icons/flask.png" width={25} height={25} alt="행성의 과학"></img>
        <span className="scienceNum">
          {resources[props.planet]?.resources.science ? resources[props.planet]?.resources.science : 0}
        </span>
      </div> */}
    </LeftInfoContainer>
  );
};

export const MemoLeftInfo = memo(LeftInfo);
