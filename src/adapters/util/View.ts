export type View<T = Record<string, any>> = { status: number; data: T };

export type ErrorView = {
  status: number;
  data: { errorCode: string; message: string; description: string[] | null };
};
