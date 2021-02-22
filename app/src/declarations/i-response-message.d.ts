/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'i-response-message'{
  function dataResponse(code:number, body?: unknown): any;
  function errorResponse(code:number, body: unknown): any;
}
