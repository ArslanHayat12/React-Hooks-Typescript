import React, { useState, useEffect } from "react";
import { fetchData } from "../apis/index";
import { Punks } from "../interfaces/interface";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "../constants/";
import "../styles/styling.css";
import useDebounce from "../utils/";
const Search = Input.Search;
const PunkUseState = () => {
  const [listItems, setListItems] = useState<Punks>({ hits: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [numberOfRecords, setLoadRecords] = useState(showRecords);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearchTerm = useDebounce(query, 2000);

  useEffect(() => {
    setIsSearch(true);
    if (debouncedSearchTerm) {
      fetchSearchedListItems();
    } else {
      setIsFetching(true);
      setLoadRecords(showRecords);
    }
    function fetchSearchedListItems(p?: any) {
      setListItems({ hits: [] });
      fetchData(debouncedSearchTerm)
        .then(result => {
          setListItems({ hits: result.data });
        })
        .catch(err => {
          console.log("Error", err);
        });
      setIsFetching(false);
      setIsSearch(false);
    }
  }, [debouncedSearchTerm]);

  const loadRecords = numberOfRecords;
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
    function fetchMoreListItems() {
      setTimeout(() => {
        fetchData(null, loadRecords)
          .then(result => {
            setListItems({ hits:result.data });
          })
          .catch(err => {
            console.log("Error", err);
          });
        setIsSearch(false);
        setIsFetching(false);
      }, 3000);
    }
  }, [isFetching, listItems, loadRecords]);

  function handleScroll() {
    if (
      document.documentElement.scrollHeight ===
      document.documentElement.clientHeight +
        Math.floor(document.documentElement.scrollTop)
    ) {
      setLoadRecords(p => p + showRecords);
      setIsFetching(true);
    }
  }

  return (
    <>
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

      <List
        bordered
        dataSource={listItems.hits}
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
      {(isFetching || isSearch) && (
        <div className="spinner">
          <Spin />
          <Alert message="Fetching Records ..." type="info" />
        </div>
      )}
    </>
  );
};

export default PunkUseState;
