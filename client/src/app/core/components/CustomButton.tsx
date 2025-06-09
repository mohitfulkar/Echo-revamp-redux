import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
    label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...rest }) => {
    return <Button {...rest} >{label}</Button>;
};

export default CustomButton;
