import React from 'react';
import { Tag } from 'antd';
import { getStatusColor } from '../constants/colorCase.js';

const StatusTag: React.FC<{ status: string }> = ({ status }) => {

  const color = getStatusColor(status);

  return <Tag color={color}>{status?.toUpperCase()}</Tag>;
};

export default StatusTag;
