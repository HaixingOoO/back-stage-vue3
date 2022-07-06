export const getSession = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) as string);
};

export const setSession = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
