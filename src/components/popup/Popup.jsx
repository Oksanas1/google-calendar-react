import React from "react";
import PropTypes from "prop-types";

import "./popup.scss";

const Popup = ({ style, handleDelete }) => (
  <div className="popup" style={style}>
    <button className="popup__delet-btn" onClick={handleDelete}>
      Delet
    </button>
  </div>
);

Popup.propTypes = {
  style: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Popup;
