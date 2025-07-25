import type { ColumnConfig } from "../../../core/models/sharedComponent";

export const columnConfigMap: Record<string, ColumnConfig[]> = {
  voter: [
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
  ],
  panelists: [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Contact Number", dataIndex: "contactNumber" },
    { title: "Occupation", dataIndex: "occupation" },
    {
      title: "Area of Expertise",
      dataIndex: "areaOfExpertise",
    },
    {
      title: "Excellence Rating",
      dataIndex: "excellenceRating",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ],
  admin: [
    { title: "Admin Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Permission Level", dataIndex: "permissionLevel" },
  ],
};
