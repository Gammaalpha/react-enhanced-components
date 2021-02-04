import { IHeader } from "./header";
export declare type Order = "asc" | "desc" | undefined;
export interface TableStyle {
    header?: string;
    headerCell?: string;
    bodyCell?: string;
}
export interface IDataTable {
    dataSource: any[];
    headers: IHeader[];
    itemKey: string;
    order?: Order;
    orderBy?: string;
    groupBy?: string;
    filter?: boolean;
    checkbox?: boolean;
    emit?: any;
    customStyle?: TableStyle;
    rowsPerPageOptions?: number[];
    rowsPerPage?: number;
    emptySpacing?: boolean;
    selected?: string[];
    multiSort?: boolean;
    classes?: any;
}
export interface ITableState {
    dataItems: any[];
    order: Order;
    orderBy: string | undefined;
    page: number;
    rowsPerPage: number;
    chips: ChipData[];
}
export interface ChipData {
    key: number;
    label: string;
}
