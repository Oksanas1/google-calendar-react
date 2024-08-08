const calculatePosition = (e, eventRef) => {
  const resultStyle = {};
  const { clientX, clientY } = e;
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  const { offsetX, offsetY } = e.nativeEvent;

  const popupWidth = eventRef.current.offsetWidth || 200;
  const popupHeight = eventRef.current.offsetHeight || 100;
  const endOfCoordinatePopupWidth = clientX + popupWidth;
  const endOfCoordinatePopupHeight = clientY + popupHeight;

  if (
    endOfCoordinatePopupWidth > viewportWidth &&
    endOfCoordinatePopupHeight > viewportHeight
  ) {
    resultStyle.right = 0;
    resultStyle.top = offsetY - 40;
  } else if (endOfCoordinatePopupWidth > viewportWidth) {
    resultStyle.right = 0;
    resultStyle.top = offsetY;
  } else if (endOfCoordinatePopupHeight > viewportHeight) {
    resultStyle.left = offsetX;
    resultStyle.top = offsetY - 40;
  } else {
    resultStyle.top = offsetY;
    resultStyle.left = offsetX;
  }
  return resultStyle;
};

export default calculatePosition;
