import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as allActions from './actions/allActions';
import { Modal } from './components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const actions = {
    ...allActions,
};


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renameClm: null,
            newColumnName: '',
            showModal: false,
            newTitle: '',
            newDescription: '',
            taskOpen: '',
        };
    }

    handleDragStart(e, taskId) {
        e.dataTransfer.setData('text/plain', taskId);
    }

    handleDrop(e, columnId) {
        const taskId = e.dataTransfer.getData('text');
        this.props.dragNdropTask(taskId, columnId);
    }

    render() {
        const { taskOpen, newTitle, newDescription } = this.state;
        const { boardReducer } = this.props;

        return (
            <div className="App">
                <div className="header">
                    <button className="add-column" onClick={() => this.props.addColumn()}>Add Column</button>
                </div>
                <div className="container">
                    {boardReducer.columns.map((column) => {
                        return (
                            <div className="clm-container" key={column.id} id={column.id}
                                 onDragOver={(e) => e.preventDefault()}
                                 onDrop={(e) => this.handleDrop(e, column.id)}>
                                <div className="clm-header">
                                    <div>
                                        {this.state.renameClm === column.id
                                            ? <div>
                                                <input type="text"
                                                       onChange={e => this.setState({ newColumnName: e.target.value })}/>
                                                <button
                                                    onClick={() => {
                                                        this.props.renameColumn(column.id, this.state.newColumnName);
                                                        this.setState({ renameClm: null })
                                                    }}>Save
                                                </button>
                                            </div>
                                            : <button onClick={() => this.setState({ renameClm: column.id })}>
                                                Rename</button>
                                        }
                                    </div>
                                    <button className="delete" onClick={() => this.props.deleteColumn(column.id)}>
                                        <FontAwesomeIcon icon={faTrash}/></button>
                                </div>
                                <p className="clm-title">{column.title}</p>
                                <button className="btn-blue" onClick={() => this.props.addTask(column.id)}>
                                    Add task
                                </button>
                                <div className="tasks-container mt-1">
                                    {Object.keys(boardReducer.tasks).filter(key => column.taskIds.includes(key)).map(item => {
                                        return (
                                            <div id={item} className="task" key={item} draggable
                                                 onDragStart={(e) => this.handleDragStart(e, item)}>
                                                <div className="task-header">
                                                    <div className="action-buttons">
                                                        <button onClick={() => this.setState({
                                                            showModal: true,
                                                            taskOpen: item
                                                        })}>EDIT
                                                        </button>
                                                        <button
                                                            onClick={() => this.props.deleteTask(item)}
                                                        >DELETE
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="task-title">{boardReducer.tasks[ item ].title || '-'}</p>
                                                <p className="task-description">{boardReducer.tasks[ item ].description || '-'}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {this.state.showModal && <Modal
                    onClose={() => this.setState({ showModal: false })}
                    onSave={() => {
                        this.props.saveNewTaskTitle(taskOpen, newTitle, newDescription);
                        this.setState({ showModal: false, taskOpen: '', newTitle: '', newDescription: '' })
                    }}
                    newTitle={newTitle}
                    newDescription={newDescription}
                    titleValue={(newTitle) => this.setState({ newTitle })}
                    descriptionValue={(newDescription) => this.setState({ newDescription })}
                />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        boardReducer: state.boardReducer,
    };
};

export default connect(mapStateToProps, actions)(App);
