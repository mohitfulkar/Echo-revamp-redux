// src/core/components/SharedSelect.tsx
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface SharedSelectProps<ValueType = string> extends SelectProps<ValueType> {
    label?: string;
    options: { label: string; value: ValueType }[];
    isMulti?: boolean;
}

const SharedSelect = <ValueType extends string | number = string>({
    label,
    options,
    isMulti = false,
    ...rest
}: SharedSelectProps<ValueType>) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Select
                mode={isMulti ? 'multiple' : undefined}
                options={options}
                style={{ width: '100%' }}
                {...rest}
            />
        </div>
    );
};

export default SharedSelect;
