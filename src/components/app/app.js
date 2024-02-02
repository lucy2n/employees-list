import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
      data : [
        {
          name: "Lucy",
          salary: 800,
          increase: true,
          id: uuidv4(),
          rise: false,
        },
        {
          name: "Kate",
          salary: 300,
          increase: false,
          id: uuidv4(),
          rise: false,
        },
        {
          name: "Andr",
          salary: 1000,
          increase: true,
          id: uuidv4(),
          rise: false,
        }
      ]
    }
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id),
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name, 
      salary,
      increase: false,
      id: uuidv4()
    }
    this.setState(({ data }) => {
        const newData = [...data, newItem];
        return {
          data: newData
        }
    })
  }

  onToggleIncrease = (id) => {
    this.setState(({data}) => ({
      data: data.map((item) => {
        if(item.id === id) {
          return {...item, increase: !item.increase}
        }
        return item
      })
    }))
  }

  onToggleRise = (id) => {
    console.log(`Rise this ${id}`)
  }

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(elem => elem.increase).length;
    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList
            data={this.state.data}
            onDelete={this.deleteItem}
            onToggleIncrease={this.onToggleIncrease}
            onToggleRise={this.onToggleRise}
          />
          <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
