import React, { Component } from 'react';
import Header from './components/Header/Header';
import ToDoList from './components/ToDoList/ToDoList';
import AddItem from './components/AddItem/AddItem';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';

class App extends Component {
    state = {
        items: [],
        filterStr: '',
        filterStatus: 'all'
    }

    componentDidMount() {
        const todosInLS = JSON.parse(localStorage.getItem('todos')) || [];
        if (!todosInLS) return [];
        this.setState({ items: todosInLS })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            localStorage.setItem('todos', JSON.stringify(this.state.items))
        }
    }

    changeItemState = (property, id) => {
        const { items } = this.state;

        const changedState = items.map(item => {
            if (item.id !== id) return item;
            item[property] = !item[property];
            return item;
        });

        return this.setState({ ...this.state, items: changedState })
    }

    importantItemHandler = (id) => {
        this.changeItemState('important', id);
    }

    doneItemHandler = (id) => {
        this.changeItemState('done', id);
    }

    filterByValue = (items, filterStr) => {
        if (!filterStr.length) return items;

        return items.filter((item) => {
            return item.text.toLowerCase().indexOf(filterStr.toLowerCase()) > -1;
        })
    }

    filterByStatus = (items, status) => {
        switch (status) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onSearchChange = (filterStr) => {
        this.setState({ filterStr })
    }

    onFilterChange = (filterStatus) => {
        this.setState({ filterStatus })
    }

    addItemHandler = (value) => {
        const { items } = this.state;
        const newItem = {
            id: items.length + 1,
            text: value,
            important: false,
            done: false
        }
        this.setState({ items: [...items, newItem] });
    }

    renderList = () => {
        let content;
        const { items, filterStr, filterStatus } = this.state;
        const visibleItems = this.filterByStatus(this.filterByValue(items, filterStr), filterStatus);

        if (this.state.items.length) {
            content = (<ToDoList items={visibleItems}
                importantItemHandler={this.importantItemHandler}
                doneItemHandler={this.doneItemHandler}
                deleteItemHandler={this.deleteItemHandler} />);
        } else {
            content = (<p className={styles.noTodos}>Please add your first ToDo</p>)
        }

        return content;
    }

    deleteItemHandler = (id) => {
        const { items } = this.state;
        const currentElIndex = items.findIndex(item => item.id === id);
        const changedItems = [
            ...items.slice(0, currentElIndex),
            ...items.slice(currentElIndex + 1)
        ];

        this.setState({ items: changedItems });
    }


    render() {
        const { items, filterStatus } = this.state;

        return (
            <div className={styles.app}>
                <Header items={items} title="ToDo List" />
                <Filter items={items}
                    onSearchChange={this.onSearchChange}
                    filterStatus={filterStatus}
                    onFilterChange={this.onFilterChange} />
                {this.renderList()}
                <AddItem items={items} addItemHandler={this.addItemHandler} />
            </div>
        );
    }
}

export default App;