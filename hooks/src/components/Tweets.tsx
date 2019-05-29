import React from "react";
import { TweetService, TweetSearchService } from "../services/TweetServices";
import { List, Input } from "antd";
const Tweets: React.FC<{}> = () => {
  const service = TweetService();
  const [title, setTitle] = React.useState("");
  const search = TweetSearchService(title, service.hits);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setTitle(event.target.value);
  };
  const Search = Input.Search;

  return (
    <>
      <List
        header={
          <Search
            placeholder="search keyword"
            name="title"
            onSearch={value => handleChange}
            onChange={handleChange}
            enterButton
          />
        }
        bordered
        dataSource={search.hits}
        renderItem={item => <List.Item>{item.title}</List.Item>}
      />
      {/* {search.hits.map((result, i) => (
          <div key={i}>{result.title}</div>
        ))} */}
    </>
  );
};

export default Tweets;
