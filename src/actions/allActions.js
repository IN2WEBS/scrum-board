import * as types from "./types";

export function addColumn() {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.ADD_COLUMN,
                payload: Math.random().toString(36).substr(2, 9),
            })
        } catch (err) {

        }
    }
}

export function deleteColumn(id) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.DELETE_COLUMN,
                payload: id,
            })
        } catch (err) {

        }
    }
}

export function renameColumn(id, title) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.RENAME_COLUMN,
                payload: { id, title },
            })
        } catch (err) {

        }
    }
}

export function addTask(columnId) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.ADD_TASK,
                payload: { id: Math.random().toString(36).substr(2, 9), columnId },
            })
        } catch (err) {

        }
    }
}

export function saveNewTaskTitle(id, title, description) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.SAVE_NEW_TASK_TITLE,
                payload: { id, title, description },
            })
        } catch (err) {

        }
    }
}

export function deleteTask(id) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.DELETE_TASK,
                payload: id,
            })
        } catch (err) {

        }
    }
}

export function dragNdropTask(taskId, columnId) {
    return async function (dispatch) {
        try {
            dispatch({
                type: types.DRAG_TASK,
                payload: { taskId, columnId },
            })
        } catch (err) {

        }
    }
}
