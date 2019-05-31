export type MainState = {
  type: string;
};

export type hitsResponse = {
  name: string;
  image_url: string;
};

export type State = {
  status?: "empty" | "loading" | "error" | "success";
  error?: string;
  data?: hitsResponse[];
  query?:string;
  pageNo?:any
};

export type Action = {
  type: "request" | "success" | "failure" | "input" ;
  error?: string;
  results?: hitsResponse[];
  query?:string;
  pageNo?:any
};
