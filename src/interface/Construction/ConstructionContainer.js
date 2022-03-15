import React from "react";
import styled from "styled-components";
import { screenStore } from "../../hooks/stores/screenStore";
import { MemoProductionControl } from "./ProductionControl";

const HoverInfoContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  //z-index: 100;
  opacity: ${(props) => (props.hoverCheck ? 1 : 0)};
  z-index: ${(props) => (props.hoverCheck ? 100 : -2000000)};

  top: 0px;
  left: 0px;

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

  .imageBox {
    display: flex;
    flex-direction: column;
    .image {
      position: absolute;
      display: block;
      width: 450px;
      height: 253px;
    }
    .imageScript {
      position: absolute;
      top: 285px;
      font-size: 15px;
    }
    .cost-add {
      padding-top: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #b8b8b87a;

      .costTitle {
        color: #dddddd;
        width: 100%;
        border-top: 1px solid #b8b8b87a;
        font-size: 20px;
      }

      .costText {
        font-size: 18px;
        margin-left: 5px;
        font-weight: bold;

        img {
          margin-right: 5px;
          vertical-align: top;
        }
      }
      .cF {
        color: DarkGreen;
      }
      .cT {
        color: #1c58ff;
      }
      .cO {
        color: #ff6a7d;
      }

      .addTitle {
        margin-top: 5px;
        color: #d3d3d3;
      }
      .addText {
        margin: 2px 0px 0px 5px;
        img {
          margin-right: 5px;
          vertical-align: bottom;
        }
      }
      .aF {
        color: #ff5757;
      }
      .aG {
      }
      .aS {
      }
      .aH {
      }
      .aB {
      }
      .aT {
      }
      .aO {
      }
    }
  }
`;

export const ConstructionContainer = () => {
  const resourcesProduction = screenStore.getState().resourcesProduction;
  const hoverCheck = screenStore((state) => state.hoverCheck);
  console.log("행성 관리창 랜더링");
  return (
    <>
      <HoverInfoContainer hoverCheck={hoverCheck !== false ? true : false}>
        <div className="imageName">{resourcesProduction[hoverCheck === false ? "potato" : hoverCheck].name}</div>
        {Object.keys(resourcesProduction).map((item, index) => (
          <div key={item + index + " 박스"} className="imageBox">
            <img
              key={item + index + " 이미지"}
              className="image"
              src={resourcesProduction[item].img}
              alt={`${item + " 이미지"}`}
              style={hoverCheck === item ? { opacity: "1", zIndex: "100", display: "block" } : { display: "none" }}></img>
            <div
              key={item + index + " 설명"}
              className="imageScript"
              style={hoverCheck === item ? { opacity: "1", zIndex: "100", display: "block" } : { display: "none" }}>
              {resourcesProduction[item].description}
              {resourcesProduction[item].cost !== undefined ? (
                <div className="cost-add">
                  <div className="costTitle">비용</div>
                  <span className="costText cF">
                    <img src="images/resources/icons/corn.png" width={25} height={25} alt={`${item + " 식량 이미지"}`}></img>
                    {resourcesProduction[item].cost.food}
                  </span>
                  {resourcesProduction[item].cost.titanium > 0 ? (
                    <span className="costText cT">
                      <img
                        src="images/resources/icons/titanium.png"
                        width={25}
                        height={25}
                        alt={`${item + " 티타늄 이미지"}`}></img>
                      {resourcesProduction[item].cost.titanium}
                    </span>
                  ) : null}
                  {resourcesProduction[item].cost.orichalcon > 0 ? (
                    <span className="costText cO">
                      <img
                        src="images/resources/icons/orichalcon.png"
                        width={25}
                        height={25}
                        alt={`${item + " 오리하르콘 이미지"}`}></img>
                      {resourcesProduction[item].cost.orichalcon}
                    </span>
                  ) : null}
                  {resourcesProduction[item].add !== undefined ? <div className="addTitle">효과</div> : null}
                  {resourcesProduction[item].add.food !== undefined ? (
                    <div
                      className="addText aF"
                      style={resourcesProduction[item].add.food > 0 ? { color: "#82ff82" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/corn.png"
                        width={20}
                        height={20}
                        alt={`${item + " 초당 식량 이미지"}`}></img>
                      {resourcesProduction[item].add.food} /s
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.gear !== undefined ? (
                    <div
                      className="addText aG"
                      style={resourcesProduction[item].add.gear > 0 ? { color: "#ffd29a" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/gear.png"
                        width={20}
                        height={20}
                        alt={`${item + " 생산력 이미지"}`}></img>
                      {resourcesProduction[item].add.gear}
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.science !== undefined ? (
                    <div
                      className="addText aS"
                      style={resourcesProduction[item].add.science > 0 ? { color: "#5fc4ff" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/science.png"
                        width={20}
                        height={20}
                        alt={`${item + " 과학 이미지"}`}></img>
                      {resourcesProduction[item].add.science}
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.happiness !== undefined ? (
                    <div
                      className="addText aH"
                      style={resourcesProduction[item].add.happiness > 0 ? { color: "#f1ffb4" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/happiness.png"
                        width={18}
                        height={18}
                        alt={`${item + " 행복도 이미지"}`}></img>
                      {resourcesProduction[item].add.happiness}
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.barrier !== undefined ? (
                    <div
                      className="addText aB"
                      style={resourcesProduction[item].add.barrier > 0 ? { color: "#af68ff" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/barrier.png"
                        width={20}
                        height={20}
                        alt={`${item + " 방어막 이미지"}`}></img>
                      {resourcesProduction[item].add.barrier}
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.titanium !== undefined ? (
                    <div
                      className="addText aT"
                      style={resourcesProduction[item].add.titanium > 0 ? { color: "#1c58ff" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/titanium.png"
                        width={20}
                        height={20}
                        alt={`${item + " 티타늄 이미지"}`}></img>
                      {resourcesProduction[item].add.titanium} /s
                    </div>
                  ) : null}
                  {resourcesProduction[item].add.orichalcon !== undefined ? (
                    <div
                      className="addText aO"
                      style={resourcesProduction[item].add.orichalcon > 0 ? { color: "#ff6a7d" } : { color: "#ff5757" }}>
                      <img
                        src="images/resources/icons/orichalcon.png"
                        width={20}
                        height={20}
                        alt={`${item + " 오리하르콘 이미지"}`}></img>
                      {resourcesProduction[item].add.orichalcon} /s
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </HoverInfoContainer>
      <MemoProductionControl />
    </>
  );
};
