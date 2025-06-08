export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type ApiErrorResponse = {
  message: string;
  statusCode: number;
  path: string;
  method: string;
  timestamp: string;
};

export type ApiResponse<T> = {
  items: T[];
  total: number;
  page?: number;
  take?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};
