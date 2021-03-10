import React from 'react';
import './App.css';
import useCollapse from 'react-collapsed';
import Cookies from 'js-cookie';


function Task(props) {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const userToken = Cookies.get('userToken');

    const deleteTodo = (id) => {
        fetch(`https://mern-todo-ubaid.herokuapp.com/${id}`, {
            method: 'DELETE',
        }).then(() => {
            window.location.reload()
        })
    }

    return (
        <>
            <div className="task">
                <div className="task-head" {...getToggleProps()}>
                    <h2>{props.name}</h2>
                    <button style={{ marginLeft: 'auto' }} onClick={() => deleteTodo(props.id)}>Delete</button>
                </div>
                <div className="task-body" {...getCollapseProps()}>
                    <p>Title: {props.name}</p>
                    <p>Discription: {props.disc}</p>
                    <p>Date: {props.date}</p>
                    <p>Time: {props.time}</p>
                </div>
            </div>
        </>
    )
}


export default Task;