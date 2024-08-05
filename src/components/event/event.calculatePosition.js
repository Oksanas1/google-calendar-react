const calculatePosition = (e, eventRef) => {
  const { layerY, layerX } = e.nativeEvent;
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

  const popupWidth = eventRef.current.offsetWidth || 200;
  const popupHeight = eventRef.current.offsetHeight || 100;

  const left = Math.min(layerX, viewportWidth - popupWidth);
  const top = Math.min(layerY, viewportHeight - popupHeight);

  return { top, left };
};

export default calculatePosition;
