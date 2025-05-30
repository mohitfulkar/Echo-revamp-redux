// utils/colorPipe.ts
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "green";
    case "completed":
      return "blue";
    case "draft":
      return "orange";
    case "inactive":
      return "red";
    case "expired":
      return "red";
    default:
      return "gray";
  }
};
