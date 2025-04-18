export const getUserVariables = (): Record<string, string> => {
  const raw = localStorage.getItem('variables');
  return raw ? JSON.parse(raw) : {};
};

export const saveUserVariables = (vars: Record<string, string>): void => {
  localStorage.setItem('variables', JSON.stringify(vars));
};
