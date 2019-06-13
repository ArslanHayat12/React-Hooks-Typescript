import React,{Fragment} from "react";
import { PunkService, PunkSearchService } from "../../services/PunkServices";
import { Input } from "antd";
const HooksWithServices: React.FC<{}> = () => {
  const [title, setTitle] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setTitle(event.target.value);
  };
  const Search = Input.Search;

  return (
    <Fragment>
      <Search
        placeholder="search keyword"
        name="title"
        onSearch={value => handleChange}
        onChange={handleChange}
        enterButton
      />
      {/* for understanding purpose separate logic is handled */}
      {title ? <PunkSearchService title={title}/> : <PunkService />}
    </Fragment>
  );
};

export default HooksWithServices;
