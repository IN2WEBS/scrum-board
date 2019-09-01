const boardReducer = (state = {
    tasks: {},
    columns: [],
}, action) => {
    switch (action.type) {
        case 'ADD_COLUMN':
            return {
                ...state,
                columns: [
                    ...state.columns,
                    { id: `column-${action.payload}`, title: 'Unnamed Column', taskIds: [] }
                ]
            };
        case 'DELETE_COLUMN':
            const columnNotDelete = state.columns.filter(item => item.id !== action.payload).map(item => item.taskIds).flat();

            return {
                ...state,
                tasks: columnNotDelete.reduce((obj, key) => ({ ...obj, [key]: state.tasks[ key ] }), {}),
                columns: state.columns.filter(item => item.id !== action.payload),
            };
        case 'RENAME_COLUMN':
            return {
                ...state,
                columns: state.columns.map(item => {
                    if (item.id === action.payload.id) return { ...item, title: action.payload.title };
                    return item
                }),
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [`task-${action.payload.id}`]: {
                        id: `task-${action.payload.id}`,
                        title: 'Title',
                        description: 'Description'
                    },
                },
                columns: state.columns.map(item => {
                    if (item.id === action.payload.columnId) return {
                        ...item,
                        taskIds: [ ...item.taskIds, `task-${action.payload.id}` ]
                    };
                    return item
                })
            };
        case 'SAVE_NEW_TASK_TITLE':
            const newTasksObj = {};
            Object.keys(state.tasks).forEach(item => {
                    if (item !== action.payload.id) {
                        newTasksObj[ item ] = state.tasks[ item ];
                    } else {
                        newTasksObj[ item ] = {
                            id: item,
                            title: action.payload.title,
                            description: action.payload.description
                        };
                    }
                }
            );
            return {
                ...state,
                tasks: newTasksObj
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: Object.keys(state.tasks).filter(item => item !== action.payload).reduce(
                    (obj, key) => ({ ...obj, [key]: state.tasks[ key ] }), {})
            };
        case 'DRAG_TASK':
            return {
                ...state,
                columns: state.columns.map(item => {
                    if (item.id === action.payload.columnId) return {
                        ...item,
                        taskIds: [ ...item.taskIds, action.payload.taskId ]
                    };
                    if (item.taskIds.find(item => item === action.payload.taskId)) return {
                        ...item,
                        taskIds: item.taskIds.filter(item => item !== action.payload.taskId)
                    };
                    return item
                })
            };
        default:
            return state;
    }
};


export default boardReducer;
