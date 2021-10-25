import React, { Component } from 'react';
import styles from './AddItem.module.css';

class AddItem extends Component {

    state = {
        value: ''
    }
    addHandler = (e) => {
        e.preventDefault();
        const { addItemHandler } = this.props;
        const { value } = this.state;
        addItemHandler(value);
        e.target[0].value = '';
    }

    addValueToState(e) {
        let value = e.target.value;
        this.setState({ value: value });
        
    }

    render() {
        return (
            <form className={styles.addItemBox} onSubmit={(e) => { this.addHandler(e) }} >
                <input onChange={(e) => { this.addValueToState(e) }} className={styles.addInput} type="text" placeholder="What needs to be done"></input>
                <button className={styles.addItemBtn} type="submit">Add Item</button>
            </form>
        );
    }
}

export default AddItem;