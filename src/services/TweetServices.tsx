import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "antd";
import { TweetsType } from "../types/types";
export interface Tweets {
  hits: TweetsType[];
  state: string;
}
export type TweetsKeyword = Pick<TweetsType, "title">;
//const Search = Input.Search;
const TweetService = () => {
  const [data, setData] = useState<Tweets>({ hits: [], state: "simple" });
  useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=redux")
      .then(result => {
        setImmediate(() => {
          setData(result.data);
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);
  return (
    <List
      bordered
      dataSource={data.hits}
      renderItem={item => <List.Item>{item.title}</List.Item>}
    />
  );
};

const TweetSearchService = ({ title }: any) => {
  const [data, setData] = useState<Tweets>({ hits: [], state: "simple" });
  useEffect(() => {
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${title}`)
      .then(result => {
        setImmediate(() => {
          setData(result.data);
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, [title]);
  return (
    <List
      bordered
      dataSource={data.hits}
      renderItem={item => <List.Item>{item.title}</List.Item>}
    />
  );
};

export { TweetService, TweetSearchService };
