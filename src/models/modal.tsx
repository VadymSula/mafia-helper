import React from 'react';
import './modal.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper__setPlayers"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0',
                     // display: props.show ? 'block' : 'none',
                 }}>
                <div className="modal-header">
                    <h3>{props.header}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default modal;