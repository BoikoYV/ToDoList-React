import React, { Component } from 'react';
import Header from './Header/Header';
import ToDoList from './ToDoList/ToDoList';
import AddItem from './AddItem/AddItem';
import Filter from './Filter/Filter';
import styles from './App.module.css';

class App extends Component {
    state = {
        items: [{
            id: 1,
            text: 'cofee',
            important: false,
            done: false
        },
        {
            id: 2,
            text: 'tea',
            important: false,
            done: false
        },
        {
            id: 3,
            text: 'latte',
            important: false,
            done: false
        }],
        filterStr: '',
        filterStatus: 'all'
    }

    changeItemState(property, id) {
        const { items } = this.state;

        const currentElIndex = items.findIndex((item) => {
            if (item.id === id) return item;
        });

        const beforeCurrent = items.slice(0, currentElIndex);
        const afterCurrent = items.slice(currentElIndex + 1);
        const currentEl = items[currentElIndex];
        currentEl[property] = !currentEl[property];

        this.setState({ ...beforeCurrent, currentEl, ...afterCurrent })

    }

    importantItemHandler = (id) => {
        this.changeItemState('important', id);
    }

    doneItemHandler = (id) => {
        this.changeItemState('done', id);
    }

    filterByValue = (items, filterStr) => {
        if (filterStr.length === 0) {
            return items;
        }

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
        this.setState(({ items }) => {
            const newItem = {
                id: items.length + 1,
                text: value,
                important: false,
                done: false
            }
            const changedItems = [...items, newItem];
            return { items: changedItems };
        })

    }

    deleteItemHandler = (id) => {
        this.setState(({ items }) => {
            const currentElIndex = items.findIndex(item => item.id === id);
            const changedItems = [
                ...items.slice(0, currentElIndex),
                ...items.slice(currentElIndex + 1)
            ];

            return { items: changedItems };
        })
    }

    render() {
        const { items, filterStr, filterStatus } = this.state;
        const visibleItems = this.filterByStatus(this.filterByValue(items, filterStr), filterStatus);

        return (
            <div className={styles.app}>
                <Header items={items} title="ToDo List" />
                <Filter items={items}
                    onSearchChange={this.onSearchChange}
                    filterStatus={filterStatus}
                    onFilterChange={this.onFilterChange} />
                    
                <ToDoList items={visibleItems}
                    importantItemHandler={this.importantItemHandler}
                    doneItemHandler={this.doneItemHandler}
                    deleteItemHandler={this.deleteItemHandler} />
                <AddItem items={items} addItemHandler={this.addItemHandler} />
            </div>
        );
    }
}

export default App;