import { useEffect, useRef } from "react";
import { useStore } from "./useStore";

export const SetUp = (focus, name, type, size) => {
  const zoomCheck = useRef(useStore.getState().zoom);
  const orbitHide = useRef(useStore.getState().orbitHide);
  useEffect(() => {
    useStore.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
    useStore.subscribe((state) => {
      orbitHide.current = state.orbitHide;
    });
  });

  useStore.setState({ selectSize: size });
  useStore.setState({ focus: focus });
  useStore.setState({ name: name });
  useStore.setState({ type: type });
  useStore.setState({ zoom: !zoomCheck.current });
  useStore.setState({ orbitHide: !orbitHide.current });
  //useStore.setState({ zoom: true });
};
