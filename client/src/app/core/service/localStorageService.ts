export const getUserFromLocalStorage = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getUserRole = () => {
  const user = getUserFromLocalStorage();
  return user?.role || null;
};

export const getActiveModuleFromLocalStorage = () => {
  const moduleStr = localStorage.getItem("activeModule");
  if (!moduleStr) return null;
  try {
    return JSON.parse(moduleStr);
  } catch {
    return null;
  }
};

export const getActiveModule = () => {
  const activeModule = getActiveModuleFromLocalStorage();
  return activeModule || null;
};
