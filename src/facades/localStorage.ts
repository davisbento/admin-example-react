export const saveToken = (value: string) => {
  localStorage.setItem('authToken', value);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const clearStorage = () => {
  localStorage.clear();
};
