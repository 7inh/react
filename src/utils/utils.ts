export const isRequestSuccessful = (response: any): boolean => {
  return response?.status === 200 || response?.status === 201
}
