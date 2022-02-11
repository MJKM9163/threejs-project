import React, { memo } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const LeftInfoContainer = styled.div`
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
    //background-color: #7e967e81;
  }

  .food {
    .foodNum {
      font-size: 20px;
      margin-right: 15px;
      color: #b8b8b8;
    }
  }
  .productivity {
    .productNum {
      font-size: 20px;
      margin-right: 15px;
      color: #b8b8b8;
    }
  }
  .science {
    .scienceNum {
      font-size: 20px;
      margin-right: 15px;
      color: #b8b8b8;
    }
  }
`;

export const LeftInfo = (props) => {
  //const setHoverCheck = planetStore.setState({hoverCheck: false})
  console.log(props.resources);
  console.log("왼쪽 정보창 랜더링");
  return (
    <LeftInfoContainer>
      <div className="name">{props.planetName}</div>
      <div
        className="food"
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "potato"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/corn.png"
          width={25}
          height={25}
          alt="생산하는 식량"
        ></img>
        <span className="foodNum">
          {props.resources[props.planetName]?.resources.food}
        </span>
      </div>
      <div
        className="productivity"
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "gear"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/gear.png"
          width={25}
          height={25}
          alt="행성의 생산력"
        ></img>
        <span className="productNum">
          {props.resources[props.planetName]?.resources.gear}
        </span>
      </div>
      <div
        className="science"
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "science"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/flask.png"
          width={25}
          height={25}
          alt="행성의 과학"
        ></img>
        <span className="scienceNum">
          {props.resources[props.planetName]?.resources.science}
        </span>
      </div>
    </LeftInfoContainer>
  );
};

export const MemoLeftInfo = memo(LeftInfo);
