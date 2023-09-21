import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Dmitriy D.' , salary: 8000, increase: false, like: true, id: 1},
                {name: 'Konstantin K.' , salary: 11000, increase: false, like: false, id: 2},
                {name: 'Gennady Y.' , salary: 14000, increase: true, like: false, id: 3},
            ], 
            term: '', 
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = { 
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) >-1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like); // if(item.rise) return
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            case 'bonus': 
                return items.filter(item => item.increase);
            case 'evenElement':
                return items.filter(item => item.id % 2 === 0)
            case 'oddElement':
                return items.filter(item => item.id % 2 !== 0)
            default: 
                return items //Никак не фильтруем элементы 
        }
    }

    onFilterSelect = (filter) => { //То с чем может повзоимодействовать пользователь 
        this.setState({filter});
    }


    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const initialValue = 0;
        const sum = this.state.data.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.salary;
        }, initialValue) + ' $';
        const visibleData = this.onFilterPost(this.searchEmp(data, term), filter); // Фильтруем отфильтрованный массив 
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} salary={sum}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
