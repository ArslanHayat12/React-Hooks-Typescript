import React from "react";
import { TweetService, TweetSearchService } from "../services/TweetServices";
import { Input } from "antd";
const Tweets: React.FC<{}> = () => {
  //const service = TweetService();
  const [title, setTitle] = React.useState("");
  // const search = TweetSearchService(title, service.hits);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setTitle(event.target.value);
  };
  const Search = Input.Search;

  return (
    <>
      <Search
        placeholder="search keyword"
        name="title"
        onSearch={value => handleChange}
        onChange={handleChange}
        enterButton
      />
      {/* for understanding purpose separate logic is handled */}
      {title ? <TweetSearchService title={title}/> : <TweetService />}
    </>
  );
};

export default Tweets;
