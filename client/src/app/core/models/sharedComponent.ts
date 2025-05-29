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
  content: React.ReactNode;
}

export interface SharedTabsProps {
  tabs: TabConfig[];
  defaultActiveKey?: string;
  className?: string;
  onChange?: (activeKey: string) => void;
}
