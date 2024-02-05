export type LaravelErrors = {
  response: {
    data: {
      errors: {
        [key: string]: string[]
      }
    }
  }
}
