import React, { Component } from 'react';
import styles from './Header.module.css'

class Header extends Component {
    render() {

        const { title, items } = this.props;
        const needToDo = items.filter(item => !item.done)

        return (
            <div className={styles.headerBox}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.counter}>{needToDo.length} more to do, {items.length - needToDo.length} done</p>
            </div>
        );
    }
}

export default Header;