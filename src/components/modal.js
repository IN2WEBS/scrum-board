import React from 'react';

export const Modal = ({onClose, titleValue='', newTitle, descriptionValue='', newDescription, onSave}) => {
    return (
        <div className="modalTask">
            <div className="content">
                <h1 onClick={onClose}>X</h1>
                <h1>Labas</h1>
                <input
                    type="text"
                    value={newTitle}
                    onChange={e => titleValue(e.target.value)}
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={e => descriptionValue(e.target.value)}
                />
                <h1 onClick={onSave}>SAVE</h1>
            </div>
        </div>
    );
};
