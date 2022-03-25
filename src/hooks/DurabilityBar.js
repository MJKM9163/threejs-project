import React from "react";
import styled from "styled-components";
import { boundingStore } from "./stores/boundingStore";
import { planetStore } from "./stores/planetStore";

const DurabilityBarComponent = styled.div`
  opacity: ${(props) => (props.D >= 100 ? 0 : 1)};
  position: relative;
  top: ${(props) => (props.name === "planet" ? "-30px" : "-15px")};
  left: -50%;
  width: 50px;
  height: 5px;
  background-color: white;

  div {
    transition: 0.3s;
    width: ${(props) => props.D + "%"};
    height: 100%;
    background-color: #9b4a4a;
  }
`;

export const FighterDurabilityBar = ({ num, name }) => {
  const data = boundingStore((state) => state.friendlyNum);

  return (
    <DurabilityBarComponent D={data[num].D} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const PlanetDurabilityBar = ({ num, name, d }) => {
  const data = planetStore((state) => state.planetDurability);
  // data[num].D - data[num].D / data[num].D * 100

  return (
    <DurabilityBarComponent D={(data[num].D / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};
