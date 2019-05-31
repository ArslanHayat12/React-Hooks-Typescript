import React, { useReducer, useEffect } from "react";
import { List, Input, Spin } from "antd";
import { fetchData } from "../apis/index";
import { State, Action } from "../types";
const Search = Input.Search;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "input":
      return { query: action.query };
    case "request":
      return { status: "loading", query: action.query };
    case "success":
      return { status: "success", data: action.results, query: action.query };
    case "failure":
      return { status: "error", error: action.error, query: action.query };
  }
}

function TweetsReducer() {
  const [state, dispatch] = useReducer(reducer, { status: "empty" });
  let a = state.query;

  useEffect(() => {
    let ignore = false;
    dispatch({ type: "request", query: a });
    fetchData(a).then(
      results => {
        if (!ignore)
          dispatch({ type: "success", results: results.data, query: a });
      },
      error => dispatch({ type: "failure", error, query: a })
    );

    return () => {
      ignore = true;
    };
  }, [a]);

  return (
    <>
      <Search
        placeholder="search keyword"
        name="title"
        value={state.query}
        onSearch={value => dispatch({ type: "input", query: value })}
        onChange={e => dispatch({ type: "input", query: e.target.value })}
        enterButton
      />
      {state.status === "loading" && <Spin />}
      {state.status === "success" && (
        <div>
          {state.data && state.data ? (
            <List
              bordered
              dataSource={state.data}
              renderItem={item => <List.Item>{item.name}</List.Item>}
            />
          ) : null}
        </div>
      )}
      {state.status === "error" && <span>Error: {state.error}</span>}
    </>
  );
}

export default TweetsReducer;
