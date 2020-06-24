import React, { useState } from 'react';
import './App.css';
import { IHeader } from './core/DataTable/model/header';
import { DataTable } from './core/DataTable/DataTable';
import { makeStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';


export interface IItem {
  id: number,
  department: string,
  name: string
}

const customStyle = {
  header: 'headerStyle1',
  headerCell: "headerCellStyle1",
  bodyCell: "bodyCellStyle1"
}

const useStyles = makeStyles({
  idRow: {
    textAlign: "center"
  }
})


function App() {
  console.log("App...");
  const classes = useStyles();
  const headers: IHeader[] = [
    {
      key: "id",
      text: "ID",
      cell: (row: IItem) => <div className={classes.idRow}>{row.id}</div>
    },
    {
      key: "department",
      text: "Department",
      cell: (row: IItem) => `${row.department}`
    },
    {
      key: "name",
      text: "Name",
      cell: (row: IItem) => `${row.name}`
    },
    {
      key: "actions",
      text: "actions",
      cell: (row: IItem) => <button>Edit</button>,
      sort: false
    }
  ]


  const items: IItem[] = [
    {
      id: 0,
      department: "Development",
      name: "John Smith",
    },
    {
      id: 1,
      department: "Development",
      name: "Jane Doe",
    }, {
      id: 2,
      department: "Management",
      name: "Bruce Wayne",
    },
    {
      id: 3,
      department: "Advertising",
      name: "Clark Kent",
    },
    {
      id: 4,
      department: "Security",
      name: "Jim Gordon",
    },
    {
      id: 5,
      department: "Marketing",
      name: "Barbara Gordon",
    },
    {
      id: 6,
      department: "Procurement",
      name: "Selena Kyle",
    },
    {
      id: 7,
      department: "Landscaping",
      name: "Pamela Ivy",
    },
    {
      id: 8,
      department: "Research",
      name: "Lucius Fox",
    }
  ]
  const handleIncomingData = (data: IItem) => {
    console.log("Data retrieved: ", data);

  }
  const [state, setState] = useState({
    checkbox: true,
    multiSort: false,
    filter: true,
    emptySpacing: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const renderCheckBoxSwitch = () => {
    return (
      <Switch
        checked={state.checkbox}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'Switch to enable checkbox property.'
        }}
        name="checkbox"
      />)
  }

  const renderMultiSortSwitch = () => {
    return (
      <Switch
        checked={state.multiSort}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'Switch to enable multi-sort property.'
        }}
        name="multiSort"
      />)
  }
  const renderFilterSwitch = () => {
    return (
      <Switch
        checked={state.filter}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'Switch to enable filter property.'
        }}
        name="filter"
      />)
  }
  const renderSpacingSwitch = () => {
    return (
      <Switch
        checked={state.emptySpacing}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'Switch to enable empty spacing property.'
        }}
        name="emptySpacing"
      />)
  }
  return (

    <div className={'Padding25px'}>
      <div className={'Spacing'}>
        <div>
          Checkbox: {renderCheckBoxSwitch()}
        </div>
        <div>
          Multi-Sort: {renderMultiSortSwitch()}
        </div>
        <div>
          Empty Spacing: {renderSpacingSwitch()}
        </div>
        <div>
          Filter: {renderFilterSwitch()}
        </div>
      </div>
      <DataTable multiSort={state.multiSort} headers={headers} customStyle={customStyle} dataSource={items} emit={(data: IItem) => handleIncomingData(data)} checkbox={state.checkbox} itemKey="id" filter={state.filter} emptySpacing={state.emptySpacing}></DataTable>
    </div>
  );
}

export default App;
