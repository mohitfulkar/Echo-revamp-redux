export interface DataPanelProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  percentage: string; // e.g. "12%" or "-5%"
}

export interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder?: string;
  handleSearch: (value: string) => void;
}

export interface TabConfig {
  label: string;
  key: string;
}

export interface SharedTabsProps {
  tabs: TabConfig[];
  defaultActiveKey?: string;
  className?: string;
  onChange?: (activeKey: string) => void;
}

export interface DataType {
  id?: string | number;
  [key: string]: any; // support dynamic keys for data rows
}

export interface ColumnConfig {
  title: string;
  dataIndex: string;
}

export interface ActionType {
  name: string;
  label: string;
  onClick: (row: DataType) => void;
}

export interface ReusableTableProps {
  data: DataType[];
  columnsConfig: ColumnConfig[];
  actions?: ActionType[];
}

export interface SearchProps {
  searchValue: string;
}
