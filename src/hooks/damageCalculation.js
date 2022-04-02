import { boundingStore } from "./stores/boundingStore";
import { planetStore } from "./stores/planetStore";

export const planetDamageCalculation = (num, weaponsData) => {
  if (weaponsData.source === "enemy") {
    switch (weaponsData.weapon.type) {
      case "missile":
        planetStore.setState(
          (state) =>
            (state.planetDurability[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      case "pulse":
        planetStore.setState(
          (state) =>
            (state.planetDurability[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      default:
        break;
    }
  }
};

export const friendlyDamageCalculation = (num, weaponsData) => {
  if (weaponsData.source === "enemy") {
    switch (weaponsData.weapon.type) {
      case "missile":
        boundingStore.setState(
          (state) => (state.friendlyLive[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      case "pulse":
        boundingStore.setState(
          (state) => (state.friendlyLive[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      default:
        break;
    }
  }
};

export const enemyDamageCalculation = (num, weaponsData) => {
  if (weaponsData.source === "friendly") {
    switch (weaponsData.weapon.type) {
      case "missile":
        boundingStore.setState(
          (state) => (state.enemyLive[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      case "pulse":
        boundingStore.setState(
          (state) => (state.enemyLive[num].durability -= weaponsData.weapon.damage * weaponsData.adjust)
        );
        break;
      default:
        break;
    }
  }
};
