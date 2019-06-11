export type MainState = {
  type: string;
};

export type hitsResponse = {
  id: string | number;
  name: string;
  image_url: string;
  brewers_tips: string;
};

export type State = {
  status?: "empty" | "loading" | "error" | "loaded";
  error?: string;
  data?: hitsResponse[];
  query?: string;
  numberOfRecords?: any;
  isLoaded?: boolean;
};

export type Action = {
  type: "success" | "failure" | "input" | "recordsToDisplay";
  error?: string;
  data?: hitsResponse[];
  query?: string;
  numberOfRecords?: any;
  isLoaded?: boolean;
};
