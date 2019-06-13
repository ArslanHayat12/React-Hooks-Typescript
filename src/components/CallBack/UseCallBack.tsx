import React, { Fragment, useState, useCallback, useEffect } from "react";
import { fetchData } from "../../apis/index";
import UseCallBackChild from "./UseCallBackChild";
import { Divider, Input } from "antd";
import useDebounce from "../../utils";
import { showRecords } from "../../constants";
const Search = Input.Search;

const UseCallBack = () => {
  const [query, setQuery] = useState<string>();
  const [numberOfRecords, setLoadRecords] = useState<number>(20);
  const debouncedSearchTerm = useDebounce(query, 2000);

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight ===
      document.documentElement.clientHeight +
        Math.floor(document.documentElement.scrollTop)
    ) {
      setLoadRecords(p => p + showRecords);
      setQuery("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const callbackFunction = useCallback(() => {
    const request = debouncedSearchTerm
      ? fetchData(debouncedSearchTerm)
      : fetchData(debouncedSearchTerm, numberOfRecords);
    return request.then(
      results => ({ status: "success", hits: results.data }),
      error => ({ status: "failure", error })
    );
  }, [debouncedSearchTerm, numberOfRecords]);

  return (
    <Fragment>
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

      <UseCallBackChild
        action={callbackFunction}
        debouncedSearchTerm={debouncedSearchTerm}
      />
    </Fragment>
  );
};
export default UseCallBack;
