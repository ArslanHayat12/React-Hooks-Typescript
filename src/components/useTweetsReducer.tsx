import React, { useReducer, useEffect } from "react";
import { fetchData } from "../apis/index";
import { State, Action } from "../types";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "../constants/";
import "../styles/styling.css";
import useDebounce from "../utils/";
const Search = Input.Search;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loadMore":
      return {
        isLoaded: action.isLoaded,
        numberOfRecords: state.numberOfRecords
      };
    case "recordsToDisplay":
      return {
        query: state.query,
        numberOfRecords: action.numberOfRecords,
        data: state.data
      };
    case "input":
      return {
        query: action.query,
        numberOfRecords: state.numberOfRecords
      };
    case "request":
      return {
        status: "loading",
        query: state.query,
        numberOfRecords: state.numberOfRecords
      };
    case "success":
      return {
        status: "loaded",
        data: action.data,
        query: state.query,
        numberOfRecords: state.numberOfRecords
      };
    case "failure":
      return {
        status: "error",
        error: action.error,
        query: state.query //numberOfRecords: state.numberOfRecords
      };
  }
}

function TweetsReducer() {
  const [state, dispatch] = useReducer(reducer, {
    status: "empty",
    numberOfRecords: 20
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearchTerm = useDebounce(state.query, 500);
  const num = state.numberOfRecords ? state.numberOfRecords : 20;

  useEffect(() => {
    if (state.isLoaded) {
      dispatch({
        type: "recordsToDisplay",
        numberOfRecords: num + showRecords
      });
    }
  }, [state.isLoaded, num]);

  useEffect(() => {
    let ignore = false;
    let request = debouncedSearchTerm
      ? fetchData(debouncedSearchTerm)
      : fetchData(debouncedSearchTerm, state.numberOfRecords || showRecords);
    dispatch({ type: "request" });

    setTimeout(() => {
      request.then(
        results => {
          if (!ignore)
            dispatch({
              type: "success",
              data: results.data,
              numberOfRecords: state.numberOfRecords
            });
        },
        error =>
          dispatch({ type: "failure", query: debouncedSearchTerm, error })
      );
    }, 2000);
    return () => {
      ignore = true;
    };
  }, [debouncedSearchTerm, state.numberOfRecords]);

  function handleScroll() {
    if (
      document.documentElement.scrollHeight ===
      document.documentElement.clientHeight +
        Math.ceil(document.documentElement.scrollTop)
    ) {
      dispatch({
        type: "loadMore",
        isLoaded: true
      });
    }
  }

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Search
          placeholder="search keyword"
          name="title"
          value={state.query}
          onSearch={value => dispatch({ type: "input", query: value })}
          onChange={e => dispatch({ type: "input", query: e.target.value })}
          enterButton
          style={{ width: 500 }}
        />
      </div>

      <Divider />

      {state.status === "loaded" && (
        <div>
          {state.data && state.data ? (
            <List
              bordered
              dataSource={state.data}
              renderItem={(item, i) => (
                <List.Item
                  key={i}
                  extra={<img width={27} alt="logo" src={item.image_url} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image_url} />}
                    title={item.name}
                    description={item.brewers_tips}
                  />
                </List.Item>
              )}
            />
          ) : null}
        </div>
      )}
      {state.status === "loading" && (
        <div className="spinner">
          <Spin />
          <Alert message="Fetching Records ..." type="info" />
        </div>
      )}
      {state.status === "error" && <span>Error: {state.error}</span>}
    </>
  );
}

export default TweetsReducer;
