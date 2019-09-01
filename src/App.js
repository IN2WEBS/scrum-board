import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as allActions from './actions/allActions';
import { Modal } from './components/modal';
import './App.css';

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
        return (
            <div className="App">
                <div className="addColumn" onClick={() => this.props.addColumn()}>
                    +
                </div>

                <div className="container">
                    {this.props.boardReducer.columns.map((column) => {
                        return (
                            <div className="clm-container" key={column.id} id={column.id}
                                 onDragOver={(e) => e.preventDefault()}
                                 onDrop={(e) => this.handleDrop(e, column.id)}>
                                <div className="clm-header">
                                    <div>
                                        {this.state.renameClm === column.id
                                            ? <>
                                            <input type="text"
                                                   onChange={e => this.setState({ newColumnName: e.target.value })}/>
                                            <button
                                                onClick={() => {
                                                    this.props.renameColumn(column.id, this.state.newColumnName);
                                                    this.setState({ renameClm: null })
                                                }}>SAVE
                                            </button>
                                            </>
                                            : <p onClick={() => this.setState({ renameClm: column.id })}>Rename</p>}
                                    </div>
                                    <p style={{ color: "red" }} onClick={() => this.props.deleteColumn(column.id)}>
                                        Delete</p>
                                </div>
                                <p className="clm-title">{column.title}</p>
                                <div className="addTask"
                                     onClick={() => this.props.addTask(column.id)}>
                                    + ADD TASK
                                </div>
                                <div className="tasks-container">
                                    {Object.keys(this.props.boardReducer.tasks).filter(key => column.taskIds.includes(key)).map(item => {
                                        return (
                                            <div id={item} draggable onDragStart={(e) => this.handleDragStart(e, item)}
                                                 className="task" key={item}>
                                                {this.props.boardReducer.tasks[ item ].title}
                                                {this.props.boardReducer.tasks[ item ].description}
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
                        this.props.saveNewTaskTitle(this.state.taskOpen, this.state.newTitle, this.state.newDescription);
                        this.setState({ showModal: false })
                    }}
                    newTitle={this.state.newTitle}
                    newDescription={this.state.newDescription}
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
