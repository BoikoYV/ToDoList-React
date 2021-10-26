import React, { Component } from 'react';
import styles from './AddItem.module.css';

class AddItem extends Component {

    state = {
        value: null,
    };

    handlerSubmit = (e) => {
        e.preventDefault();
        const { addItemHandler } = this.props;
        const { value } = this.state;

        if (!e.target[0].value.length) return;

        addItemHandler(value);
        e.target[0].value = '';
    }

    addValueToState = (e) => {
        let value = e.target.value;
        if (value !== this.state.value) this.setState({ value: value });

    }

    render() {
        return (
            <form className={styles.addItemBox} onSubmit={this.handlerSubmit}>
                <input onChange={this.addValueToState} className={styles.addInput} type="text" placeholder="What needs to be done"></input>
                <button className={styles.addItemBtn} type="submit">Add Item</button>
            </form>
        );
    }
}

export default AddItem;