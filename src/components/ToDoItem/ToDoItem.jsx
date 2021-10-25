import React, { Component } from 'react';
import styles from './ToDoItem.module.css';



class ToDoItem extends Component {

    doneHandler = (id) => {
        const { doneItemHandler } = this.props;
        doneItemHandler(id);
    }

    importantHandler = (id) => {
        const { importantItemHandler } = this.props;
        importantItemHandler(id);

    }
    deleteHandler = (id) => {
        const { deleteItemHandler } = this.props;
        deleteItemHandler(id)
    }

    render() {
        const { text, done, important, id } = this.props;

        const doneClasses = `${styles.itemText} ${done ? styles.cross : ''} ${important ? styles.important : ''}`;
        const importantBtnClasses = `${styles.importantBtn} ${styles.btn}`;

        return (
            <li className={styles.item}>
                <p className={styles.checkZone} >
                    <input className={styles.checkbox} type="checkbox" id={`box${id}`} />
                    <label htmlFor={`box${id}`} onClick={() => { this.doneHandler(id) }}>
                        <span className={doneClasses} >{text}</span>
                    </label>
                </p>
                <div className={styles.btnBox}>
                    <button onClick={() => { this.deleteHandler(id) }} className={`${styles.deleteBtn} ${styles.btn}`}></button>
                    <button onClick={() => { this.importantHandler(id) }} className={importantBtnClasses}></button>
                </div>
            </li>
        );
    }
}

export default ToDoItem;