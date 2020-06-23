# React Enhanced Components

## About

An AODA and WCAG 2.0 compliant library with various Material-UI based components.

## Setup

You can install the production version of this repository by using the following npm command

`npm install https://github.com/Gammaalpha/react-enhanced-table.git#production`

## DataTable

### Demo

You can view a demo of this project [here](https://gammaalpha.github.io/react-table-demo/).


### Usage

After including the repository into your project, you can import the component as follows:

`import { DataTable, IHeaderProps } from "react-enhanced-table/prod";`

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
| customStyle        | optional       | TableStyle        | Custom styling to apply to table body cells.                                                 |
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

### Column based styling

Users can apply styles to columns based on the column key. This allows for more customization for both headers and body cells.

The name of the class is based on the key of the column. For example, if the key for a column is 'id', then the custom class will be MuiColumnHeader_id for the header cell, and MuiColumn_id for the body cell.

### Styling issues

If there are any issues related to styling when importing the DataTable system, refer to this link to add [class name generator](https://material-ui.com/styles/api/#creategenerateclassname-options-class-name-generator)

## Upcoming features

- Group by row items

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

None at this time. Yay!

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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br  />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br  />

You will also see any lint errors in the console.

### `yarn publish`

Creates the build files for publishing and pushes them to the production branch to be used as a downloadable package within a project.

### `yarn test`

Launches the test runner in the interactive watch mode.<br  />

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build-wp`

Builds the app for production to the `build` folder using webpack<br  />

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br  />

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## _DISCLAIMER_

The author(s) of this project do not take any responsibility for any issues arising from the use of this project or any of its functionality and provides the use of this project in good faith with all of its capabilities AS IS with no guarantee or warranties.

_Note: The author may change the terms of use at any time._
