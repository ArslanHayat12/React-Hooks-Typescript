import React, { useState, useMemo, useCallback, useContext } from "react";
import axios from "axios";
import { TweetsType } from "../types/types";
import ChildComponent from "./TwitterChildComponent";
import { Input } from "antd";
import { HooksContext } from "../App";
const Search = Input.Search;

export interface Tweets {
  hits: TweetsType[];
  status: string;
}

const UseTwitterCallBackAndMemo = () => {
  const [query, setQuery] = useState<string>();
  const [memoCount, setMemoCount] = useState(0);

  const callbackFunction = useCallback(() => {
    return axios(`https://hn.algolia.com/api/v1/search?query=${query}`).then(
      results => {
        return { status: "success", hits: results.data.hits };
      },
      error => ({ status: "failure", error })
    );
  }, [query]);

  useMemo(() => {
    console.log(memoCount, "memo called");
    return memoCount;
  }, [memoCount]);
  const context = useContext(HooksContext);
  return (
    <>
    <div> useCallback  {context} </div>
      <Search
        placeholder="search keyword"
        name="title"
        value={query}
        onSearch={value => setQuery(value)}
        onChange={e => setQuery(e.target.value)}
        enterButton
      />
      <button onClick={() => setMemoCount(memoCount + 1)}>
        Change memo count
      </button>
      <ChildComponent action={callbackFunction} />
    </>
  );
};
export default UseTwitterCallBackAndMemo;
