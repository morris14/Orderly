import React, { useEffect, useState, createRef } from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions/task";
import PropTypes from "prop-types";
import { toggleTaskForm } from "../../actions/view";
import "./TaskForm.scss";

const TaskForm = ({
    task: { current },
    project: { projects },
    view: { task_form_open },
    addTask,
    toggleTaskForm,
}) => {
    const [taskData, setTaskData] = useState({
        body: current ? current.body : "",
        project_id: current ? current.project : null,
    });

    const ref = createRef();

    useEffect(() => ref.current.focus(), [ref]);

    const { body, project_id } = taskData;

    const onBodyChange = e => setTaskData({ ...taskData, body: e.target.value });

    const onProjectChange = e => setTaskData({ ...taskData, project_id: e.target.value });

    const onSubmit = () => {
        addTask(taskData);
        setTaskData({ body: "", project_id: null });
        toggleTaskForm(task_form_open);
    };

    return (
        <div className={task_form_open ? "task-form  active" : "task-form"}>
            <div className='task-form__bg' />
            <textarea
                ref={ref}
                name='body'
                value={body}
                onChange={e => onBodyChange(e)}
                placeholder='Your task...'
            />
            <select name='project_id' onChange={e => onProjectChange(e)}>
                <option value=''>None</option>
                {projects &&
                    projects.map(project => (
                        <option
                            key={project._id}
                            value={project._id}
                            selected={project._id === project_id ? "selected" : null}
                        >
                            {project.name}
                        </option>
                    ))}
            </select>
            <div className='task-form__actions'>
                <span className='labels'>@</span>
                <span className='priority'>!!!</span>
            </div>
            <button onClick={e => onSubmit()} />
        </div>
    );
};

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    toggleTaskForm: PropTypes.func.isRequired,
    view: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    view: state.view,
    project: state.project,
    task: state.task,
});

export default connect(
    mapStateToProps,
    { addTask, toggleTaskForm },
)(TaskForm);