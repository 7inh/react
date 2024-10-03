export const getToken = (): string | undefined => import.meta.env.VITE_API_KEY
export const setToken = (token: string): void =>
  localStorage.setItem("token", token)
export const removeToken = (): void => localStorage.removeItem("token")
