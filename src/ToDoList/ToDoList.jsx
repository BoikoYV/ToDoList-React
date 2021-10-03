import React, { Component } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import styles from "./ToDoList.module.css";


class ToDoList extends Component {

    render() {
        const { items, importantItemHandler, doneItemHandler, deleteItemHandler } = this.props;
        const toDoItems = items.map(({ id, done, important, text }) => {
            return <ToDoItem importantItemHandler={importantItemHandler}
                doneItemHandler={doneItemHandler}
                deleteItemHandler={deleteItemHandler}
                key={id} text={text} id={id}
                done={done}
                important={important} />
        })

        return (
            <ul className={styles.list}>
                {toDoItems}
            </ul>
        );
    }
}

export default ToDoList;