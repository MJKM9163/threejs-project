import React from "react";
import styled from "styled-components";
import { boundingStore } from "./stores/boundingStore";
import { planetStore } from "./stores/planetStore";
import { screenStore } from "./stores/screenStore";

const DurabilityBarComponent = styled.div`
  opacity: ${(props) => (props.D >= 100 ? 0 : 1)};
  position: relative;
  top: ${(props) => (props.name === "planet" ? "-50px" : "-15px")};
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

export const FighterDurabilityBar = ({ num, name, d }) => {
  const data = boundingStore((state) => state.friendlyLive[num].durability);

  return (
    <DurabilityBarComponent D={(data / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const EnemyDurabilityBar = ({ num, name, d }) => {
  const data = boundingStore((state) => state.enemyLive[num].durability);

  return (
    <DurabilityBarComponent D={(data / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const PlanetDurabilityBar = ({ num, name, d }) => {
  const data = planetStore((state) => state.planetDurability[num].durability);
  return (
    <DurabilityBarComponent D={(data / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};

export const SatelliteDurabilityBar = ({ num, name, d }) => {
  const data = screenStore((state) => state.satellitePos[num].data.durability);

  return (
    <DurabilityBarComponent D={(data / d) * 100} name={name}>
      <div className={name} />
    </DurabilityBarComponent>
  );
};
