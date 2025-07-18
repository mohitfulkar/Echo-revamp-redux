import React from "react";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

/**
 * Props for ReusableDropdownButton component
 */
interface ReusableDropdownButtonProps {
    label: string;
    menuItems: MenuProps["items"];
    onClick: () => void;
    type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
}

/**
 * A reusable Dropdown.Button component built on Ant Design
 */
const DropDownButton: React.FC<ReusableDropdownButtonProps> = ({
    label,
    menuItems,
    onClick,
    type = "default",
}) => {
    const menuProps: MenuProps = {
        items: menuItems,
        onClick: ({ key }) => {
            const selectedItem = menuItems?.find(
                (item) => item && "key" in item && item.key === key
            ) as MenuProps["items"][number];

            if (selectedItem && "onClick" in selectedItem && typeof selectedItem.onClick === "function") {
                selectedItem.onClick();
            }
        },
    };

    return (
        <div>
            <Dropdown.Button menu={menuProps} onClick={onClick} type={type} icon={<DownOutlined />}>
                {label}
            </Dropdown.Button>
        </div>
    );
};

export default DropDownButton;
