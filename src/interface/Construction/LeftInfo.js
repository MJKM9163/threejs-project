import React, { memo } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";

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
`;

export const LeftInfo = (props) => {
  //const setHoverCheck = planetStore.setState({hoverCheck: false})
  console.log("왼쪽 정보창 랜더링");
  return (
    <LeftInfoContainer>
      <div className="name">{props.planetName}</div>
      <div
        className="food"
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "potato"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/corn.png"
          width={25}
          height={25}
          alt="생산하는 식량"
        ></img>
        <span className="foodNum">
          {props.resources[props.planetName]?.food}
        </span>
      </div>
      <div
        className="productivity"
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "gear"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/gear.png"
          width={25}
          height={25}
          alt="행성의 생산력"
        ></img>
        <span className="productNum">
          {props.resources[props.planetName]?.gear}
        </span>
      </div>
      <div
        className="science"
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "science"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/flask.png"
          width={25}
          height={25}
          alt="행성의 과학"
        ></img>
        <span className="scienceNum">
          {props.resources[props.planetName]?.science}
        </span>
      </div>
    </LeftInfoContainer>
  );
};

export const MemoLeftInfo = memo(LeftInfo);
