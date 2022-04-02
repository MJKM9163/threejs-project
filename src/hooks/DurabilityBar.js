import React from "react";
import styled from "styled-components";
import { boundingStore } from "./stores/boundingStore";
import { planetStore } from "./stores/planetStore";
import { screenStore } from "./stores/screenStore";

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
  const data = boundingStore((state) => state.friendlyLive);

  return (
    <DurabilityBarComponent D={data[num].durability} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const PlanetDurabilityBar = ({ num, name, d }) => {
  const data = planetStore((state) => state.planetDurability);

  return (
    <DurabilityBarComponent D={(data[num].durability / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const SatelliteDurabilityBar = ({ num, name, d }) => {
  const data = screenStore((state) => state.satellitePos[num].D);

  return (
    <DurabilityBarComponent D={(data / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};
