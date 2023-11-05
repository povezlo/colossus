export type HttpParamValue = string | number | boolean | ReadonlyArray<string | number | boolean>;
// export interface IHttpParams {
//   readonly [key: string]: HttpParamValue;
// }

export type IHttpParams = Record<string, any>;
