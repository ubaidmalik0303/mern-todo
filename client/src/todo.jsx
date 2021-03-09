import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Task from './task';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';



function Todo() {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const userToken = Cookies.get('userToken');
    const [isLogin, setLogin] = useState(false)
    const [name, setName] = useState('')
    const [discription, setDiscription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [todolist, setTodoList] = useState([])
    const [load, setLoad] = useState(true)
    const [username, setUsername] = useState('')

    const deleteCookie = () => {
        Cookies.remove('userToken')
        setLogin(true)
    }

    const addTodo = () => {
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                discription,
                date,
                time,
                userToken,
            })
        })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/${userToken}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        }).then(response => response.json())
        .then((data) => {
            setTodoList(data.todos)
            setUsername(data.username)
            setLoad(false)
        }).catch((err) => {
            alert(err)
        })
    }, [])

    if (!userToken) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <h3>{username}</h3>
                    <button onClick={() => deleteCookie()}>LogOut</button>
                </div>
                <div className="body">
                    {load ? false : todolist.map((val, i) => {
                        return <Task key={i} id={val._id} name={val.name} disc={val.discription} date={val.date} time={val.time} />
                    })}
                </div>
                <button className="modal-open" onClick={onOpenModal}>+</button>
            </div>
            <div>
                <Modal open={open} onClose={onCloseModal} center closeOnEsc >
                    <div className="modal-head">
                        <h1>Add Todo</h1>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={() => addTodo()}>
                            <input required onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Task" />
                            <textarea required onChange={(e) => setDiscription(e.target.value)} type="text" placeholder="Enter Discription" />
                            <input required onChange={(e) => setDate(e.target.value)} type="date" />
                            <input required onChange={(e) => setTime(e.target.value)} type="time" />
                            <button type="submit">Add Todo</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    );
}


export default Todo;