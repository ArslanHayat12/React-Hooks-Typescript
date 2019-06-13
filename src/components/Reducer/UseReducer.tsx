import React, { Fragment, useReducer, useEffect } from "react";
import { fetchData } from "../../apis/index";
import { State, Action } from "../../types";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "../../constants";
import "../../styles/styling.css";
import useDebounce from "../../utils";
import InfiniteScroll from "react-infinite-scroll-component";
const Search = Input.Search;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "recordsToDisplay":
      return {
        data: state.data,
        numberOfRecords: (state.numberOfRecords || 0) + showRecords
      };
    case "input":
      return {
        query: action.query,
        data: [],
        numberOfRecords: state.numberOfRecords
      };
    case "success":
      const filteredArr = [
        ...(state.data || []),
        ...(action.data || [])
      ].reduce(function(acc: any, current: any) {
        const x = acc.find((item: any) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return {
        status: "loaded",
        data: filteredArr,
        query: state.query,
        numberOfRecords: state.numberOfRecords
      };
    case "failure":
      return {
        status: "error",
        error: action.error,
        query: state.query,
        numberOfRecords: state.numberOfRecords
      };
  }
}

function UseReducer() {
  const [state, dispatch] = useReducer(reducer, {
    status: "empty",
    numberOfRecords: showRecords
  });

  const debouncedSearchTerm = useDebounce(state.query, 1000);

  useEffect(() => {
    let ignore = false;
    let request = debouncedSearchTerm
      ? fetchData(debouncedSearchTerm)
      : fetchData(debouncedSearchTerm, state.numberOfRecords || showRecords);
    // dispatch({ type: "request" });
    //  setTimeout(() => {
    request.then(
      results => {
        if (!ignore)
          return dispatch({
            type: "success",
            data: results.data
          });
      },
      error => dispatch({ type: "failure", query: debouncedSearchTerm, error })
    );
    //  }, 1000);
    return () => {
      ignore = true;
    };
  }, [state.numberOfRecords, debouncedSearchTerm]);
  let fetchMoreData = () => {
    setTimeout(() => {
      return dispatch({
        type: "recordsToDisplay"
      });
    }, 1500);
  };

  return (
    <Fragment>
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
      {state.status === "loaded" ? (
        <Fragment>
          {state.data && (
            <InfiniteScroll
              dataLength={state.data.length}
              next={fetchMoreData}
              height={window.outerHeight / 1.5}
              initialScrollY={debouncedSearchTerm ? 0 : 3000}
              scrollThreshold={1}
              hasMore={true}
              loader={
                debouncedSearchTerm ? null : (
                  <div className="spinner">
                    <Spin />
                    <Alert message="Fetching Records ..." type="info" />
                  </div>
                )
              }
            >
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
            </InfiniteScroll>
          )}
        </Fragment>
      ) : state.status === "error" ? (
        <span>Error: {state.error}</span>
      ) : (
        <div className="spinner">
          <Spin />
          <Alert message="Fetching Records ..." type="info" />
        </div>
      )}
    </Fragment>
  );
}

export default UseReducer;
