import React from "react";
import { PunkService, PunkSearchService } from "../services/PunkServices";
import { Input } from "antd";
const Punks: React.FC<{}> = () => {
  //const service = PunkService();
  const [title, setTitle] = React.useState("");
  // const search = PunkSearchService(title, service.hits);
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
      {title ? <PunkSearchService title={title}/> : <PunkService />}
    </>
  );
};

export default Punks;
