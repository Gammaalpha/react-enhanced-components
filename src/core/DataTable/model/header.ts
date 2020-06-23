import { TableCellProps } from "@material-ui/core";

export interface IHeader extends TableCellProps {
  key: string;
  text: string;
  cell: any;
  sort?: boolean;
}


