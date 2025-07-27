import type { StepsProps, TablePaginationConfig } from "antd";
import type { ReactNode } from "react";
import type { FieldConfig } from "./FormConfigs";

export interface DataPanelProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  percentage?: string;
  iconBgColor?: string; // Tailwind classes like "bg-blue-100"
  iconTextColor?: string; // Tailwind classes like "text-blue-500"
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
  children?: ReactNode;
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
  type?: string;
}

export interface ActionType {
  icon: ReactNode;
  label: string;
  onClick: (row: DataType) => void;
}

export interface ReusableTableProps {
  data: DataType[];
  columnsConfig: ColumnConfig[];
  actions?: ActionType[];
  icon?: ReactNode;
  pagination?: TablePaginationConfig;
  rowKey?: string | number;
}

export interface SearchProps {
  searchValue: string;
}

export interface StepItem {
  title: string;
  status?: "wait" | "process" | "finish" | "error";
  icon?: ReactNode;
  description?: string;
  subTitle?: string;
}

export interface StepperProps {
  steps: StepItem[];
  current?: number;
  direction?: StepsProps["direction"];
  size?: StepsProps["size"];
  responsive?: boolean;
  onChange?: StepsProps["onChange"];
}

export interface CrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

/**
 * Props for SharedBreadcrumb component
 */
export interface SharedBreadcrumbProps {
  items: CrumbItem[];
  showHome?: boolean;
}
export interface StepFormProps {
  action: "create" | "edit";
  onNext: () => void;
  onBack?: () => void;
  stepKey?: string;
}

export interface CardFields {
  label?: string;
  key: string;
  type?: string;
  icon?: ReactNode;
}

export interface CardComponentProps {
  labels: CardFields[];
  data: any[];
  handleAction?: (action: "view" | "edit" | "delete", record: any) => void;
}

export interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  title?: string;
  initialValues?: any;
  formFields: FieldConfig[];
  loading?: boolean;
  disabledFields?: string[];
}
