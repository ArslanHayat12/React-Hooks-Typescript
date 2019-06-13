import React, { Fragment, useState, useCallback, useEffect } from "react";
import { fetchData } from "../apis/index";
import ChildComponent from "./UsePunkCallBackAndMemoChild";
import { Divider, Input } from "antd";
import useDebounce from "../utils";
import { showRecords } from "../constants";
const Search = Input.Search;

const UsePunkCallBackAndMemo = () => {
  const [query, setQuery] = useState<string>();
  //const [memoCount, setMemoCount] = useState(0);
  const [numberOfRecords, setLoadRecords] = useState(20);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    if (
      document.documentElement.scrollHeight ===
      document.documentElement.clientHeight +
        Math.floor(document.documentElement.scrollTop)
    ) {
      setLoadRecords(p => p + showRecords);
      setQuery("");
    }
  }

  const debouncedSearchTerm = useDebounce(query, 2000);

  const callbackFunction = useCallback(() => {
    let request;
    if (debouncedSearchTerm) {
      request = fetchData(debouncedSearchTerm);
    } else {
      request = fetchData(debouncedSearchTerm, numberOfRecords);
    }
    return request.then(
      results => {
        return { status: "success", hits: results.data };
      },
      error => ({ status: "failure", error })
    );
  }, [debouncedSearchTerm, numberOfRecords]);

  // useMemo(() => {
  //   console.log(memoCount, "memo called");
  //   return memoCount;
  // }, [memoCount]);
  // const context = useContext(HooksContext);
  return (
    <Fragment>
      {/* <div> useCallback  {context} </div> */}
      <div style={{ textAlign: "right" }}>
        <Search
          placeholder="search keyword"
          name="title"
          value={query}
          onSearch={value => setQuery(value)}
          onChange={e => setQuery(e.target.value)}
          enterButton
          style={{ width: 500 }}
        />
      </div>

      <Divider />

      {/* <button onClick={() => setMemoCount(memoCount + 1)}>
        Change memo count
      </button> */}
      <ChildComponent
        action={callbackFunction}
        debouncedSearchTerm={debouncedSearchTerm}
      />
    </Fragment>
  );
};
export default UsePunkCallBackAndMemo;
