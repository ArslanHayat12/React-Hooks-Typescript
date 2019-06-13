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

type PunksType = {
  name: string;
  image_url?: string;
  brewers_tips?: string;
};
export type Punks = {
  hits?: PunksType[];
  state?: string;
  status?: string;
};

export type PunkState = {
  query?: string;
  numberOfRecords?: number;
  isFetching?: boolean;
  isSearch?: boolean;
  listItems?: Punks;
};
