import React, { Fragment, useState, useEffect } from "react";
import { fetchData } from "../../apis/index";
import { PunkState } from "../../types";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "../../constants";
import "../../styles/styling.css";
import useDebounce from "../../utils";
const Search = Input.Search;

const UseState = () => {
  const [state, setState] = useState<PunkState>({
    query: "",
    numberOfRecords: showRecords,
    isFetching: false,
    isSearch: false,
    listItems: { hits: [] }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollHeight ===
        document.documentElement.clientHeight +
          Math.floor(document.documentElement.scrollTop)
      ) {
        setState(p => {
          return {
            numberOfRecords: (p.numberOfRecords || 0) + showRecords,
            isFetching: true,
            isSearch: false,
            listItems: p.listItems
          };
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearchTerm = useDebounce(state.query, 2000);

  useEffect(() => {
    const fetchSearchedListItems = () => {
      setTimeout(() => {
        const reuest = debouncedSearchTerm
          ? fetchData(debouncedSearchTerm)
          : fetchData(debouncedSearchTerm, state.numberOfRecords);
        reuest
          .then(result => {
            setState(p => {
              const itemListData = p.listItems ? p.listItems.hits : [];
              return {
                query: p.query,
                numberOfRecords: p.numberOfRecords,
                isFetching: false,
                listItems: { hits: [...(itemListData || []), ...result.data] }
              };
            });
          })
          .catch(err => {
            console.log("Error", err);
          });
      }, 3000);
    };


    if (debouncedSearchTerm) {
      
      setState(p => {
        return {
          numberOfRecords: p.numberOfRecords,
          isFetching: true,
          listItems: p.listItems,
          query: debouncedSearchTerm
        };
      });
      fetchSearchedListItems();
    } else {

      setState(p => {
        return {
          numberOfRecords: p.numberOfRecords,
          isFetching: true,
          listItems: p.listItems,
          query: ""
        };
      });
      fetchSearchedListItems();
    }

  }, [state.numberOfRecords, debouncedSearchTerm]);

  return (
    <Fragment>
      <div style={{ textAlign: "right" }}>
        <Search
          placeholder="search keyword"
          name="title"
          value={state.query}
          onSearch={value =>
            setState({
              query: value
            })
          }
          onChange={e =>
            setState({
              query: e.target.value
            })
          }
          enterButton
          style={{ width: 500 }}
        />
      </div>
      <Divider />

      <List
        bordered
        dataSource={state.listItems ? state.listItems.hits : []}
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
      {state.isFetching && (
        <div className="spinner">
          <Spin />
          <Alert message="Fetching Records ..." type="info" />
        </div>
      )}
    </Fragment>
  );
};

export default UseState;
