import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { List, Input, Spin } from "antd";
const Search = Input.Search;
type hitsResponse = {
  hits: {
    title: string;
    objectID: string;
    url: string;
  }[];
};

type State =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: hitsResponse };

type Action =
  | { type: "request" }
  | { type: "success"; results: hitsResponse }
  | { type: "failure"; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "request":
      return { status: "loading" };
    case "success":
      return { status: "success", data: action.results };
    case "failure":
      return { status: "error", error: action.error };
  }
}

function TweetsReducer() {
  const [query, setQuery] = useState<string>();
  const [state, dispatch] = useReducer(reducer, { status: "empty" });
  useEffect(() => {
    let ignore = false;
    dispatch({ type: "request" });
    axios(`https://hn.algolia.com/api/v1/search?query=${query}`).then(
      results => {
        if (!ignore) dispatch({ type: "success", results: results.data });
      },
      error => dispatch({ type: "failure", error })
    );

    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <>
      <Search
        placeholder="search keyword"
        name="title"
        value={query}
        onSearch={value => setQuery(value)}
        onChange={e => setQuery(e.target.value)}
        enterButton
      />
      {state.status === "loading" && <Spin />}
      {state.status === "success" && (
        <div>
          {state.data && state.data.hits ? (
            <List
              bordered
              dataSource={state.data.hits}
              renderItem={item => <List.Item>{item.title}</List.Item>}
            />
          ) : null}
        </div>
      )}
      {state.status === "error" && <span>Error: {state.error}</span>}
    </>
  );
}

export default TweetsReducer;
