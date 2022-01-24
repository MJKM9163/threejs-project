import grassImg from "./images/grass.png";
import woodImg from "./images/wood.png";
import { TextureLoader } from "three";

export const grass = new TextureLoader().load(grassImg);
export const wood = new TextureLoader().load(woodImg);
