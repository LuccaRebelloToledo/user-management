class AppError extends Error {
  public readonly appErrorType: string;
  public readonly statusCode: number;

  constructor(appErrorType: string, statusCode: number) {
    super();
    this.name = `Error: ${appErrorType}`;
    this.message = this.message ? this.message : appErrorType;
    this.statusCode = statusCode;
    this.appErrorType = appErrorType;
  }
}

export default AppError;
