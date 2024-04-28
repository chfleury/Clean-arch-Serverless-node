export type View = { status: number; data: Record<string, any> };

export type ErrorView = {
  status: number;
  data: { errorCode: string; message: string; description: string[] | null };
};
