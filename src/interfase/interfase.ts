export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface IResponse {
  response: number;
  data?: IPost[];
  error?: string;
}

export interface IResp {
  loaderData: IResponse;
}
