export interface Exception<T extends string = string> {
  kind: T;
  message: string;
  description?: string;
}
