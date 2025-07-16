import type { ReactNode } from "react";

export interface FieldConfig {
  name: string;
  placeholder?: string;
  prefix?: ReactNode;
  rules?: any[];
  dependencies?: string[];
  optionsKey?: string;
  options?: FieldOption[] | string[];
  label?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<number, string>;
  accept?: string;
  multiple?: boolean;
  maxFileSizeMB?: number;
  type?:
    | "select"
    | "password"
    | "text"
    | "multi-select"
    | "textarea"
    | "number"
    | "upload"
    | "checkbox"
    | "switch"
    | "checkbox-group"
    | "slider";
}

export interface FieldOption {
  label: string;
  value: string;
}
