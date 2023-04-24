import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
    const data = [
        {name: 'Dmitriy D.' , salary: 8000, increase: false, id: 1, like: false},
        {name: 'Konstantin K.' , salary: 11000, increase: false, id: 2, like: false},
        {name: 'Gennady Y.' , salary: 14000, increase: true, id: 3, like: true},
    ];
    return (
        <div className="app">
            <AppInfo />

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>
            
            <EmployeesList data={data}/>
            <EmployeesAddForm/>
        </div>
    );
}

export default App;
