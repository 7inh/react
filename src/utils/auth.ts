export const getToken = (): string | undefined =>
  localStorage.getItem("api_key") || undefined
export const setToken = (token: string): void =>
  localStorage.setItem("token", token)
export const removeToken = (): void => localStorage.removeItem("token")
