import React, { memo } from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";

const ResourcesContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 200px;
  width: 50%;
  height: 40px;
  transform: translate(50%);

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
    color: #b8b8b8;
  }
  div:nth-child(2) {
    color: #b8b8b8;
  }
  div:nth-child(3) {
    color: #b8b8b8;
  }
  div:nth-child(4) {
    color: #b8b8b8;
  }
`;

export const Resources = (props) => {
  console.log("위쪽 통합 자원창 랜더링");
  return (
    <ResourcesContainer>
      <div
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "potato"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/corn.png"
          width={25}
          height={25}
          alt="식량 자원"
        ></img>
        <span>0</span>
      </div>
      <div
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "titanium"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/titanium.png"
          width={25}
          height={25}
          alt="티타늄 자원"
        ></img>
        <span>0</span>
      </div>
      <div
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "orichalcon"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/orichalcon.png"
          width={25}
          height={25}
          alt="오리하르콘 자원"
        ></img>
        <span>0</span>
      </div>
      <div
        onMouseEnter={() =>
          screenStore.setState({ hoverCheck: ["images", "science"] })
        }
        onMouseLeave={() => screenStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/flask.png"
          width={25}
          height={25}
          alt="과학 자원"
        ></img>
        <span>0</span>
      </div>
    </ResourcesContainer>
  );
};

export const MemoResources = memo(Resources);
