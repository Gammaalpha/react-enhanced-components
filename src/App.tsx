import React, { useState } from 'react';
import './App.css';
import { DataTable, IHeaderProps, MarkdownEditor, RichTextEditor } from "./core/index";
import { Switch, makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Label, MainContainer } from './core/Styles/CommonStyles';

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
  const headers: IHeaderProps[] = [
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
    emptySpacing: false,
    editor: true
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

  const renderEditorSwitch = () => {
    return (
      <Switch
        checked={state.editor}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'Switch to enable/disable rich text editor edit mode.'
        }}
        name="editor"
      />)
  }

  const dataTableExpansionPanel = () => {
    return (
      <ExpansionPanel >
        <ExpansionPanelSummary className={'LightGrayB'} expandIcon={<ExpandMoreIcon />}>
          <Typography>Data Table</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={'FullWidth'}>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  const richTextEditorExpansionPanel = () => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary className={'LightGrayB'} expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Rich Text Editor
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={'FullWidth'}>
            <div className={'Spacing'}>
              <div>
                Edit mode {state.editor ? '(ON)' : "(OFF)"}: {renderEditorSwitch()}
              </div>
            </div>
            <RichTextEditor editing={state.editor}
              value={`<p>New Tab <a class="rec-a" href="https://www.google.ca/" rel="noopener noreferrer" title="Discussion Board">Content</a></p>`}
            ></RichTextEditor>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }


  const [edit, setEdit] = useState(true);
  const [borderPreview, setBorderPreview] = useState(true);
  const toggleEditMode = () => {
    setEdit(!edit)
  }

  const toggleBorderPreview = () => {
    setBorderPreview(!borderPreview)
  }
  const content = `*[html]:hypertext\n\n*[test]:testing\n\n[google]: https://www.google.ca "google"\n\n**test** [google] html\n\n## Heading

| Column 1       | Column 2     | Column 3     |
|:---------------|:------------:|-------------:|
|  Cell Contents | More Stuff   | And Again    |
| You Can Also   | Put Pipes In <br/>html| Like this  \\||

**!!testing!!**
`

  const markdownEditorExpansionPanel = () => {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary className={'LightGrayB'} expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Markdown Editor
      </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={'FullWidth'}>
            <div className={'Spacing'}>
              <MainContainer>
                <div className="centerAlign">
                  <h1>Markdown editor with Abbreviation plugin</h1>
                </div>
                <div>
                  <Label htmlFor="edit_mode">Editable:</Label>
                  <input type="checkbox" name="edit_mode" id="edit_mode" checked={edit} onChange={toggleEditMode} />
                </div>

                <div>
                  <Label htmlFor="border_preview">Border on Preview:</Label>
                  <input type="checkbox" name="border_preview" id="border_preview" checked={borderPreview} onChange={toggleBorderPreview} />
                </div>

                <MarkdownEditor
                  borderedPreview={borderPreview}
                  content={content}
                  editable={edit}
                ></MarkdownEditor>
              </MainContainer>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  };

  return (

    <div className={'Padding25px'}>
      {dataTableExpansionPanel()}
      {richTextEditorExpansionPanel()}
    </div>

  );
}

export default App;
