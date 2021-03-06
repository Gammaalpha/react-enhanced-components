# React Enhanced Components

## About

An AODA and WCAG 2.0 compliant library with various Material-UI based components.

## Setup

You can install the production version of this repository by using the following npm command

`npm install https://github.com/Gammaalpha/react-enhanced-components.git#production`

## Demo

You can view a demo of this project [here](https://gammaalpha.github.io/react-enhanced-components/).

## DataTable

### Usage

After including the repository into your project, you can import the component as follows:

`import { DataTable, IHeaderProps } from "react-enhanced-components/core/DataTable";`

### IHeader props

| Prop | Require status | type    | Description                                                    |
| ---- | -------------- | ------- | -------------------------------------------------------------- |
| key  | required       | string  | Key for the header column to be used in sorting                |
| text | required       | string  | The title of the header to show when rendering                 |
| cell | required       | any     | Callback function to show the row cell content for the column. |
| sort | optional       | boolean | Enable or disable sorting. Enabled by default.                 |

### DataTable props

| Prop               | Require Status | type              | Description                                                                                  |
| ------------------ | -------------- | ----------------- | -------------------------------------------------------------------------------------------- |
| headers            | required       | IHeader[]         | Cells to render in the table headers                                                         |
| dataSource         | required       | any[]             | Data items to render in the table body.                                                      |
| itemKey            | required       | string            | Key to set for table row unique identifier.                                                  |
| emit               | optional       | function callback | Function callback to get data from filter and checkbox events                                |
| checkbox           | optional       | boolean           | Show checkboxes. When used alongside filter it will emit only checked items.                 |
| filter             | optional       | boolean           | Show the multi-key filter text field                                                         |
| order              | optional       | string            | Set either 'asc' or 'desc' for initial sort, works with orderBy prop filled.                 |
| orderBy            | optional       | string            | The initial column to order by during render. Place the column key here.                     |
| groupBy            | optional       | string            | Not implemented yet                                                                          |
| customStyle        | optional       | TableStyle        | Custom styling to apply to table body cells. Look at example below for more information      |
| rowsPerPageOptions | optional       | number[]          | Pass an array of numbers to set pagination view selector. Default set to 5, 10 and 15.       |
| rowsPerPage        | optional       | number            | How many rows per page should be visible. Default set at 10 per page.                        |
| emptySpacing       | optional       | boolean           | Enable to turn on empty spacing when there is missing row items below. Default set to false. |
| multiSort          | optional       | boolean           | Enable multi-sort by column. Default false.                                                  |

### Items for DataTable

Here is an example items array containing data to be rendered in the rows.

```

const items: any[] = [
    {
        id: 0,
        department: "Development",
        name: "John Smith",
    }...]

```

Example IHeader array

```

const headers: IHeaderProps[] = [
    {
        key: "id",
        text: "ID",
        cell: (row: IItem) => `${row.id}`
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
    }
]

```

To render the component with minimal props, add it as follows:

```
<DataTable
    headers={headers}
    dataSource={items}
    itemKey="id">
</DataTable>

```

### Header and Body Styles

Header and body cell styles can be modified by passing the styles prop an object below to modify the header row, header cells and body cells.

Either className objects or string can be passed to customize the header and body styling as needed.

All of the properties are optional and only non-empty props will be applied.

```
const customStyle = {
  header: 'headerStyle1',
  headerCell: "headerCellStyle1",
  bodyCell: "bodyCellStyle1"
}
```

### Column based styling

Users can apply styles to columns based on the column key. This allows for more customization for both headers and body cells.

The name of the class is based on the key of the column. For example, if the key for a column is 'id', then the custom class will be MuiColumnHeader_id for the header cell, and MuiColumn_id for the body cell.

### Styling issues

If there are any issues related to styling when importing the DataTable system, refer to this link to add [class name generator](https://material-ui.com/styles/api/#creategenerateclassname-options-class-name-generator)

## RichTextEditor

A fully AODA compliant rich text editor built on the [Quill v1.3.7](https://quilljs.com/)/[React Quill v2.0.0-beta.2](https://github.com/zenoamaro/react-quill)) framework.

### Usage

After including the repository into your project, you can import the component as follows:

`import { RichTextEditor } from "react-enhanced-components/core/RichTextEditor";`

### RichTextEditor props

| Prop     | Require Status | type    | Description                                                                            |
| -------- | -------------- | ------- | -------------------------------------------------------------------------------------- |
| id       | optional       | string  | Sets the id for the Rich Text Editor section                                           |
| editing  | required       | boolean | Enable or disable input area for editing. This also hides or shows the editor toolbar. |
| value    | optional       | string  | Passes in default value to the rich text editor.                                       |
| callback | optional       | any     | Takes in a function to return data back up to the parent component.                    |

To render the rich text editor simply put it in as below:

```javascript
    <RichTextEditor editing={booleanValue}></RichTextEditor>

```

### Markdown Editor

A fully AODA compliant markdown editor based on [Remarkjs](https://github.com/remarkjs/remark) and its [plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) along with [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md).

### Usage

After including the repository into your project, you can import the component as follows:

`import { MarkdownEditor } from "react-enhanced-components/core/MarkdownEditor";`

### MarkdownEditor props

| Prop                   | Require Status | type    | Description                                                                            |
| ---------------------- | -------------- | ------- | -------------------------------------------------------------------------------------- |
| id                     | optional       | string  | Sets the id for the Rich Text Editor section                                           |
| content                | optional       | string  | Passes in default value to the rich text editor.                                       |
| editing                | required       | boolean | Enable or disable input area for editing. This also hides or shows the editor toolbar. |
| callback               | optional       | any     | Takes in a function to return data back up to the parent component.                    |
| borderedPreview        | optional       | boolean | Surrounds the preview area in a border.                                                |
| maxEditorHeight        | optional       | string  | Sets the height for the max height limit for the component.                            |
| maxEditorInputHeight   | optional       | string  | Sets the input area max height limit while editing.                                    |
| maxEditorPreviewHeight | optional       | string  | Sets the preview area max height limit while editing.                                  |

To render the rich text editor simply put it in as below:

```javascript
     <MarkdownEditor editable={edit}></MarkdownEditor>

```

## Upcoming features

### Markdown Editor

Optimized rendering for faster responses.

### DataTable Component

- Group by row items

### RichTextEditor Component

Note: (Dependent on base Quill for future releases and enhancements.)

- None

### Markdown Editor Component

- None reported.

## Completed features

1. Single column sort

1. Custom pagination

1. Filter support

1. Add multi-key filter.

1. Emit filtered data back to parent component

1. Checkboxes

1. Add checkboxes to rows

1. Emit checked rows to parent component

1. Emit filtered and checked rows to parent component

1. Customize header styling

1. Allow customization for header row

1. Allow customization for header cell

1. Allow for row styling

1. Allow for initial sort.

1. Allow for pagination properties set.

1. Multi-column sort.

1. Add style classes for user specific scoped styles for table header and body cells by column.

## Current bugs and issues

If bugs are found please raise an issue.

### DataTable

    No issues reported. Yay!

### RichTextEditor

- Image not inserting in the indicated cursor location.

- State not clearing for new image insertion.

- Font color and highlight glitch on selection.

## Resolved bugs

1. Fix sort issue when a row contains a cell with undefined value.

1. Fix filter edit when a user presses backspace to either remove or edit previously added key.

1. Fix filter issue when a new key is added and the filter row overflows beyond the screen.

1. Fix emit when the rows are filtered and the checked items are selected.

1. Fix pagination issue when items are sorted and it only sorts the current page view not the entire data set on all pages.

## **Development status**

This project is still under development. The author may change any or all part of the project without notice.

## Libraries Used

- [React](https://github.com/facebook/create-react-app)
- [Material-UI](https://material-ui.com/)
- [Quill v1.3.7](https://quilljs.com/)
- [React Quill v2.0.0-beta.2](https://github.com/zenoamaro/react-quill)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## _DISCLAIMER_

The author(s) of this project do not take any responsibility for any issues arising from the use of this project or any of its functionality and provides the use of this project in good faith with all of its capabilities AS IS with no guarantee or warranties.

_Note: The author may change the terms of use at any time._
