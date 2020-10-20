import React, { useState, useRef } from "react";
import { IDataTable, Order, ChipData } from "./model/DataTableModel";
import {
  Chip,
  TextField,
  Tooltip,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableCell,
  TableSortLabel,
  TableRow,
  Checkbox
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import { StylesProvider, makeStyles, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'dt_',
});
const useStyles = makeStyles({
  chips: {
    margin: "10px 5px 5px 0",
  },
  muiWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchFieldInput: {
    width: "auto",
  },
  tableHeader: {
    backgroundColor: "rgb(80, 162, 230)",
  },
  tableHeaderCell: {
    color: "black",
    fontWeight: 600,
  },
  fullWidth: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  visuallyHidden: {
    display: "none",
  },
  width_1: {
    width: "1%",
  },
  circleStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    borderRadius: '30px',
    MozBorderRadius: '30px',
    backgroundColor: '#f5f5f5'
  }
});


interface Sort {
  key: string;
  type: "asc" | "desc" | undefined
}

export function DataTable(props: IDataTable) {
  const classes = useStyles(props);
  const [dataItems] = useState(props.dataSource);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState(props.order);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [page, setPage] = useState(0);
  const [chips, setChips] = useState([] as ChipData[]);
  const [rowsPerPage, setRowsPerPage] = useState(() =>
    props.rowsPerPage === undefined ? 10 : props.rowsPerPage
  );
  const [multiSortArray, setMultiSortArray] = useState<Sort[]>([])

  const searchField: React.MutableRefObject<any> = useRef();
  // let searchField = useRef("");
  const rowsPerPageOptions = props?.rowsPerPageOptions
    ? props.rowsPerPageOptions
    : [5, 10, 15];
  const styleHeader = {
    header: props.customStyle?.header
      ? props.customStyle?.header
      : classes.tableHeader,
    headerCell: props.customStyle?.headerCell
      ? props.customStyle?.headerCell
      : classes.tableHeaderCell,
  };
  let tableItemsCount = 0;
  let pages: any[] = [];
  let dataItemsGlobal: any = dataItems;
  let dataItemsGlobalFiltered: any = [];

  const handleChipDelete = (chipToDelete: ChipData) => {
    if (chips.length > 0) {
      const chips_ = chips;
      setChips(
        chips_.filter((chip: ChipData) => chip.key !== chipToDelete.key)
      );
    }
  };

  const chipsRender = () => {
    const chipsArray = chips.map((data: ChipData) => {
      return (
        <Chip
          className={`${classes.chips}`}
          key={data.key}
          label={data.label}
          onDelete={() => handleChipDelete(data)
          }
        />
      );
    });
    return chipsArray;
  };

  const clearChips = () => {
    setChips([]);
    // searchField.current.value = ""
  };

  const clearAll = () => {
    if (chips.length === 0) {
      return <div></div>;
    } else {
      return (
        <div style={{ paddingBottom: "20px" }}>
          <Tooltip title="Clear Search Field">
            <IconButton onClick={() => clearChips()} aria-label="clear filter">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
  };

  const filterRender = () => {
    const helperText =
      "Field for multi keyword search terms. Type the term you wish to find and press enter.";

    if (props.filter) {
      return (
        <div
          className={`${classes.fullWidth} ${classes.row}`}
          id="searchFieldTop"
        >
          <TextField
            inputRef={searchField}
            id="searchField"
            fullWidth
            inputProps={{
              className: `${classes.searchFieldInput}`,
            }}
            InputProps={{
              className: `${classes.muiWrap}`,
              startAdornment: chipsRender(),
            }}
            helperText={helperText}
            onKeyUp={(e: any) => {
              if (
                e.key === "Backspace" &&
                searchField.current.value === "" &&
                chips.length > 0
              ) {
                let lastChip: ChipData = chips[chips.length - 1];
                handleChipDelete(lastChip);
                searchField.current.value = " " + lastChip.label;
              }
              if (e.key === "Enter") {
                if (e.target.value.trim() !== undefined && e.target.value !== "") {
                  handleChipAdd(sanitize(e.target.value));
                  searchField.current.value = "";
                }
              }
            }}
            multiline={false}
            label="Search field"
            aria-label="Search field - multi term"
            type="search"
            variant="outlined"
          />
          {clearAll()}
        </div>
      );
    }
    return <div></div>;
  };

  const handleChipAdd = (termInput: any) => {
    let term = termInput.trim();
    const chipLen = chips.length;
    const newChip: ChipData = {
      key: chipLen,
      label: term,
    };
    const index = chips.findIndex((chip: ChipData) => chip.label === term);
    if (index === -1) {
      const newChips = [...chips, newChip];
      setChips(newChips);
    }
  };

  const handleChangePage = (event: any, _page: number) => {
    if (event) {
      setPage(_page);
    }
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const multiSortArrayHandler = (headerKey: string) => {
    const tempArray: Sort[] = multiSortArray;
    const index = tempArray.findIndex((x) => x.key === headerKey)

    if (index === -1) {
      tempArray.push({ key: headerKey, type: 'asc' })
    }

    else {
      switch (tempArray[index]?.type) {
        case 'asc':
          tempArray[index].type = 'desc'
          break;
        case 'desc':
          props?.multiSort ? tempArray.splice(index, 1) : tempArray[index].type = 'asc';
          break;
        case undefined:
          tempArray[index].type = 'asc'
          break;
        default:
          break;
      }
    }
    if (!props?.multiSort) {
      setMultiSortArray([tempArray[tempArray.length - 1]])
    }
    else {
      setMultiSortArray(tempArray)
    }
  }

  const sortHandler = (headerKey: string) => {
    const isAsc = orderBy === headerKey && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(headerKey);
    multiSortArrayHandler(headerKey)

  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.checked) {
      const newSelects = dataItemsGlobalFiltered.map(
        (n: any) => n[props.itemKey]
      );
      setSelected(newSelects);
      return;
    }
    setSelected([]);
  };

  const getHeaderSortInfo = (headerKey: string): Sort | undefined => {
    return multiSortArray.find(x => x.key === headerKey)
  }

  const getHeaderIndex = (headerKey: string): number => {
    const index = multiSortArray.findIndex(x => x.key === headerKey)
    return index > -1 ? index + 1 : 0
  }

  const createHeader = () => {
    const tableHeaders: any[] = [];
    props.headers.forEach((header) => {
      tableHeaders.push(
        <TableCell
          variant="head"
          align={header.align}
          className={`${styleHeader.headerCell} MuiColumnHeader_${header.key}`}
          key={header.key}
          sortDirection={getHeaderSortInfo(header.key)?.key === header.key ? getHeaderSortInfo(header.key)?.type : false}
        >
          <div className={classes.row}>
            <TableSortLabel
              disabled={header?.sort === undefined ? header.sort : true}
              classes={{
                icon:
                  getHeaderSortInfo(header.key)?.key === header.key ? "activeSortCell" : "inactiveSortCell",
                active:
                  getHeaderSortInfo(header.key)?.key === header.key ? "activeSortCell" : "inactiveSortCell",
              }}
              active={getHeaderSortInfo(header.key)?.key === header.key}
              direction={getHeaderSortInfo(header.key)?.key === header.key ? getHeaderSortInfo(header.key)?.type : "asc"}
              onClick={() => sortHandler(header.key)}
            >
              {header.text}
              {getHeaderSortInfo(header.key)?.key === header.key ? (
                <span className={classes.visuallyHidden}>
                  {getHeaderSortInfo(header.key)?.type === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}

            </TableSortLabel>
            {getHeaderIndex(header.key) !== undefined && props?.multiSort && getHeaderIndex(header?.key) > 0 ?
              <span className={classes.circleStyle}>
                {getHeaderIndex(header.key)}
              </span>
              : ""}
          </div>
        </TableCell>
      );
    });

    const checkbox = () => {
      return (
        <TableCell className={classes.width_1}>
          <Checkbox
            onChange={(event) => handleSelectAllClick(event)}
            inputProps={{
              "aria-label": "Select all table items.",
            }}
          ></Checkbox>
        </TableCell>
      );
    };

    return (
      <TableRow className={styleHeader.header}>
        {props?.checkbox === undefined || props?.checkbox === false
          ? undefined
          : checkbox()}
        {tableHeaders}
      </TableRow>
    );
  };

  const getTotalItemsCount = () => {
    let finalCount = 0;
    pages.forEach((item) => {
      finalCount += item.length;
    });
    return finalCount;
  };

  const updatePages = (tableItems: any[]) => {
    const updatedPages = paginate(tableItems, rowsPerPage);
    pages = updatedPages !== undefined ? updatedPages : [];
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const createRows = () => {
    let tableRows: any[] = [];
    const sortOrderKey = orderBy;
    const sortOrder = order;
    const headers = props.headers;
    const tableCellStyle =
      props.customStyle?.bodyCell === undefined
        ? ""
        : props.customStyle.bodyCell;

    // TODO: Add Multi Sort Feature
    const tableItems: any[] = sort(
      filter(dataItemsGlobal, chips),
      sortOrder,
      sortOrderKey
    );
    updatePages(tableItems);
    tableItemsCount = getTotalItemsCount();
    const colSpan = props.headers.length + (props.checkbox ? 1 : 0);
    console.log(colSpan);

    if (tableItemsCount > 0) {
      pages[page].forEach((rowItem: any, index: number) => {
        const labelId = `table-checkbox-${index}`;
        const isItemSelected = isSelected(rowItem[props.itemKey]);
        const tableRow = headers.map((header) => {
          return (
            <TableCell
              className={`${tableCellStyle} MuiColumn_${header.key}`}
              variant="body"
              key={`${header.key}_cell${index}`}
              align={header.align}
            >
              {header.cell(rowItem, index)}
            </TableCell>
          );
        });
        const checkboxes = () => {
          return (
            <TableCell className={tableCellStyle}>
              <Checkbox
                checked={isItemSelected}
                inputProps={{
                  "aria-label": labelId,
                }}
              ></Checkbox>
            </TableCell>
          );
        };

        const tableRowItem = () => {
          return (
            <TableRow
              hover
              aria-checked={isItemSelected}
              tabIndex={-1}
              role={props?.checkbox === undefined ? "table row" : "checkbox"}
              onClick={(event) => handleClick(event, rowItem[props.itemKey])}
              key={`${rowItem[props.itemKey]}`}
            >
              {props?.checkbox === undefined || props?.checkbox === false
                ? undefined
                : checkboxes()}
              {tableRow}
            </TableRow>
          );
        };
        tableRows.push(tableRowItem());
      });
      if (props.emptySpacing) {
        const emptyRows = rowsPerPage - pages[page].length;

        if (emptyRows > 0 && tableItemsCount !== 0) {
          tableRows.push(
            <TableRow key="emptyRow" style={{ height: emptyRows * 53 }}>
              <TableCell colSpan={colSpan} />
            </TableRow>
          );
        }
      }
    } else {
      tableRows.push(
        <TableRow key="emptyRow">
          <TableCell colSpan={colSpan}>No Match Found</TableCell>
        </TableRow>
      );
    }
    dataItemsGlobalFiltered = tableItems;
    let emittedData: any[];
    if (props.checkbox && selected.length > 0) {
      emittedData = [];
      dataItemsGlobalFiltered.forEach((item: any) => {
        selected.forEach((sel: any) => {
          if (item[props.itemKey] === sel) {
            emittedData.push(item);
          }
        });
      });
      dataEmit(emittedData)
    }

    if (!props.checkbox) {
      dataEmit(dataItemsGlobalFiltered)
    }
    return tableRows;
  };

  const dataEmit = (data: any[]) => {
    if (typeof props?.emit === "function") {
      props.emit(data)
    }
  }

  const renderTable = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>{createHeader()}</TableHead>
          <TableBody>{createRows()}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={tableItemsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(event, number) => handleChangePage(event, number)}
          onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
        />
      </TableContainer>
    );
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      {filterRender()}
      {renderTable()}
    </StylesProvider>
  );
}

/**
 * Returns an array of arrays which has items segmented based on rowsPerPage
 * @param tableRows Rows of items
 * @param rowsPerPage rows per page to show
 */
function paginate(tableRows: any[], rowsPerPage: number): any[] {
  let paginatedRows = tableRows;
  const pages: any[] = [];
  if (tableRows.length > 0) {
    let pagesCount = Math.ceil(tableRows.length / rowsPerPage);
    for (let index = 0; index < pagesCount; index++) {
      const start = index * rowsPerPage;
      const end = (index + 1) * rowsPerPage;
      const paginateSlice = paginatedRows.slice(start, end);
      pages.push(paginateSlice);
    }
  }
  return pages;
}

/**
 * Function to sort data based on order and key passed.
 * @param order Whether the order is 'asc' or 'desc'
 * @param key The key to sort by
 */
function dynamicSort(order: Order, key: string | undefined) {

  if (key !== undefined) {
    return function (a: any, b: any) {
      if (order === "desc") {
        return typeof a[key] === "number"
          ? b[key] - a[key]
          : b[key]
            ?.toString()
            ?.toUpperCase()
            ?.localeCompare(a[key]?.toUpperCase());
      } else {
        return typeof a[key] === "number"
          ? a[key] - b[key]
          : a[key]?.toUpperCase()?.localeCompare(b[key]?.toUpperCase());
      }
    };
  }
  return undefined;
}

/**
 * cleans the term for use
 * @param term string to clean
 */
function sanitize(term: string) {
  return term.replace(/(\r\n|\n|\r)/gm, "");
}

/**
 * Sorts the data items based on the key and order (asc/desc)
 * @param dataItems Data items to sort
 * @param order Order of the items to be sorted to either arc or desc
 * @param key string to sort by
 */
function sort(dataItems: any[], order: Order, key: string | undefined) {

  if (dataItems !== undefined) {
    return dataItems.sort(dynamicSort(order, key));
  }
  return [];
}

/**
 * returns an array of items which match the filterTerms within dataItems.
 * @param dataItems Data items to filter from
 * @param filterTerms terms to filter
 */
function filter(dataItems: any, filterTerms: ChipData[]) {

  let inputData = dataItems;
  if (dataItems !== undefined && dataItems.length !== 0) {
    const keys = Object.keys(inputData[0]);
    if (filterTerms.length > 0) {
      filterTerms.forEach((term) => {
        const filteredData: any = [];
        let keyTerm = "";
        keys.map((key) =>
          inputData.forEach((data: any) => {
            keyTerm =
              typeof data[key] === "number"
                ? data[key].toString()
                : data[key].toLowerCase();
            if (keyTerm.toLowerCase().includes(term.label.toLowerCase())) {
              filteredData.push(data);
            }
          })
        );
        inputData = filteredData;
      });
    }
    return inputData;
  }
  return [];
}
