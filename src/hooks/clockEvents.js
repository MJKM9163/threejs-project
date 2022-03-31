import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { effectSound } from "./stores/effectSound";
import { eventStore } from "./stores/eventStore";
import { screenStore } from "./stores/screenStore";

let clockN = 1;
let clockR = Number((Math.random() * (1.5 - 0.8) + 0.8).toFixed(2));

export const ClockEvents = () => {
  const eventCheck = useRef(screenStore.getState().eventCheck);

  useEffect(() => {
    screenStore.subscribe(
      (state) => (eventCheck.current = state.eventCheck),
      (state) => state
    );
  });

  useFrame(({ clock }) => {
    if (eventCheck.current === false && clock.elapsedTime >= 300 * clockN * clockR) {
      const [eventSelect, eventName] = eventStore.getState().eventR("e");
      if (eventSelect !== null && eventName !== null) {
        clockN++;
        clockR = Number((Math.random() * (1.5 - 0.8) + 0.8).toFixed(2));
        eventStore.setState({ preEvent: eventSelect });
        console.log("이벤트 실행");
        eventStore.setState((set) => (set.eventList[eventName].check = true));
        screenStore.setState({ eventCheck: true });
        effectSound.getState().event.basicEvent.action();
      } else {
        clockN = 500000;
      }
    }
  });

  return null;
};
