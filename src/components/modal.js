import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({onClose, titleValue='', newTitle, descriptionValue='', newDescription, onSave}) => {
    return (
        <div className="modal-task">
            <div className="content">
                <div className="flex-end"><button className="reset" onClick={onClose}><FontAwesomeIcon icon={faTimes}/></button></div>
                <h3>Edit your task</h3>
                <input
                    type="text"
                    placeholder="Task title..."
                    value={newTitle}
                    onChange={e => titleValue(e.target.value)}
                />
                <input
                    className="mt-1"
                    placeholder="Task description..."
                    type="text"
                    value={newDescription}
                    onChange={e => descriptionValue(e.target.value)}
                />
                <button className="reset mt-2 btn-blue" onClick={onSave}>Save</button>
            </div>
        </div>
    );
};
