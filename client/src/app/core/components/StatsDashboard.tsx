import { Card } from "antd";
import type { IconBaseProps } from "@ant-design/icons/lib/components/Icon";
import type { FC } from "react";


interface StatsDashboardProps {
    config: StatCardConfig[];
    data: Record<string, number | string>;
}

export interface StatCardConfig {
    label: string;
    key: string;
    icon?: FC<IconBaseProps>; // Icon component (not ReactNode)
    iconColor?: string;
    iconBgColor?: string;
}
const StatsDashboard: React.FC<StatsDashboardProps> = ({ config, data }) => {


    return (
        <div className="flex flex-col md:flex-row gap-4 ">
            {config.map((item) => {
                const IconComponent = item.icon;

                return (
                    <Card key={item.key} className="flex-1 shadow-md rounded-lg">
                        <div className="flex flex-col">
                            <h3 className="h6">{item.label}</h3>
                            <div className="flex items-center justify-between">
                                <span className="h3">{data[item.key]}</span>

                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: item.iconBgColor }}
                                >
                                    {IconComponent && (
                                        <IconComponent style={{ color: item.iconColor, fontSize: 15 }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}

        </div>
    );
};

export default StatsDashboard