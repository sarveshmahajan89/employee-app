import React from "react";

const PopOverModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-container">
                <div className="modal-close" onClick={handleClose}>
                    <i className="fa fa-times" title='close' aria-hidden="true" ></i>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PopOverModal;
