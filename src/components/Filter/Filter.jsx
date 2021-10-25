import React, { Component } from 'react';
import styles from './Filter.module.css'

class Filter extends Component {
    state = {
        filterStr: ''
    }

    buttons = [
        { name: 'all', text: 'All' },
        { name: 'active', text: 'Active' },
        { name: 'done', text: 'Done' }
    ];

    filterByValueHandler = (e) => {
        const filterStr = e.target.value;
        this.setState({ filterStr })
        this.props.onSearchChange(filterStr);
    }

    render() {
        const { filterStatus, onFilterChange } = this.props;

        const buttonsElements = this.buttons.map(({ name, text }) => {
            const isActive = filterStatus === name;
            const activeBtnClass = isActive ? styles.btnSelected : '';
            return (
                <button key={name}
                    className={`${styles.btn} ${styles[`btn${text}`]} ${activeBtnClass}`}
                    onClick={() => { onFilterChange(name) }}>{text}</button>
            )
        })

        return (
            <div className={styles.filterBox}>
                <input onChange={this.filterByValueHandler}
                    type="text"
                    placeholder="Type to search"
                    className={styles.filterInput}
                    value={this.state.filterStr}></input>
                <div className={styles.btnBox}>
                    {buttonsElements}
                </div>
            </div>
        );
    }
}

export default Filter;