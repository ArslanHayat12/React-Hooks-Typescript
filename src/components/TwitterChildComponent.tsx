import React, { useState, useEffect } from "react";
import { Tweets} from "../interfaces/interface";
import { List } from "antd";

const ChildComponent = ({ action }: any) => {
  const [value, setValue] = useState<Tweets>({ hits: [], status: "" });

  useEffect(() => {
    action().then((res: any) => setValue(res));
  }, [action]);

  
  return (
    <>
      {value.status === "success" && (
        <div>
          {value.hits ? (
            <List
              bordered
              dataSource={value.hits}
              renderItem={item => <List.Item>{item.name}</List.Item>}
            />
          ) : null}
        </div>
      )}
    </>
  );
};
export default ChildComponent;
