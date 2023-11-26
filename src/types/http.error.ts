/* eslint-disable no-unused-vars */

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusMessage: string,
    message?: string,
    // eslint-disable-next-line no-undef
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
