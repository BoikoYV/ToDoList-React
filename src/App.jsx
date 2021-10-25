import React, { Component } from 'react';
import Header from './components/Header/Header';
import ToDoList from './components/ToDoList/ToDoList';
import AddItem from './components/AddItem/AddItem';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';

class App extends Component {
    state = {
        items: [],
        done: [],
        important: [],
        filterStr: '',
        filterStatus: 'all'
    }

    componentDidMount() {
        console.log(this.state);
        const todosInLS = JSON.parse(localStorage.getItem('todos')) || [];
        console.log(todosInLS);
        if (!todosInLS) return [];
        this.setState({
            items: todosInLS
        })
    }


    changeItemState(property, id) {
        const { items } = this.state;

        const currentElIndex = items.findIndex((item) => item.id === id);

        const beforeCurrent = items.slice(0, currentElIndex);
        const afterCurrent = items.slice(currentElIndex + 1);
        const currentEl = items[currentElIndex];
        currentEl[property] = !currentEl[property];

        const newState = { ...beforeCurrent, currentEl, ...afterCurrent };
        console.log(newState);
        this.setState(newState);
        // localStorage.setItem('todos', JSON.stringify(newState));


    }

    importantItemHandler = (id) => {
        this.changeItemState('important', id);
        this.setState({
            important: [...this.state.important, id]
        })
        // localStorage.setItem('todos', JSON.stringify([...this.state.important, id]));

    }

    doneItemHandler = (id) => {
        const { done } = this.state;
        this.changeItemState('done', id)
        console.log(done, id);
        console.log(done.includes(id));
        // if (!done.includes(id)) {
        //     this.setState({
        //         ...this.state,
        //         done: [...this.state.done, id]
        //     })
        //     localStorage.setItem('done', JSON.stringify({
        //         done: [...this.state.done, id]
        //     }));
        // } else {
        //     const filtered = done.filter(item => item.id !== id);
        //     console.log(filtered);
        //     this.setState({ ...this.state, done: filtered });
        //     localStorage.setItem('done', JSON.stringify({
        //         done: [...filtered]
        //     }));
        // }

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
        console.log(this.state);
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
        const changedItems = [...items, newItem];

        this.setState({ items: changedItems });
        console.log(changedItems);
        localStorage.setItem('todos', JSON.stringify(changedItems));
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
        this.setState(({ items }) => {
            const currentElIndex = items.findIndex(item => item.id === id);
            const changedItems = [
                ...items.slice(0, currentElIndex),
                ...items.slice(currentElIndex + 1)
            ];

            return { items: changedItems };
        })
        // localStorage.setItem('items', JSON.stringify(changedItems));

    }

    render() {
        const { items, filterStatus } = this.state;
        // const visibleItems = this.filterByStatus(this.filterByValue(items, filterStr), filterStatus);

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