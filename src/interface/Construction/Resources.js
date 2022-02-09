import React, { memo } from "react";
import styled from "styled-components";
import { planetStore } from "../../hooks/stores/planetStore";

const ResourcesContainer = styled.div`
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
`;

export const Resources = (props) => {
  console.log("위쪽 통합 자원창 랜더링");
  return (
    <ResourcesContainer>
      <div
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "potato"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
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
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "titanium"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
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
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "orichalcon"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
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
        onMouseEnter={() =>
          planetStore.setState({ hoverCheck: ["images", "science"] })
        }
        onMouseLeave={() => planetStore.setState({ hoverCheck: false })}
      >
        <img
          src="images/resources/icons/flask.png"
          width={25}
          height={25}
          alt="과학 자원"
        ></img>
        <span>36</span>
      </div>
    </ResourcesContainer>
  );
};

export const MemoResources = memo(Resources);
