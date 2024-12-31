interface ValidateError {
  path: string
  message: string
}

export const validateInput = (condition: boolean, path: string, message: string): void => {
  if (condition) {
    throw { path, message } as ValidateError
  }
}
