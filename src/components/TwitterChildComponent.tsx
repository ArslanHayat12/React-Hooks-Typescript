import React, { useState, useEffect } from "react";
import { TweetsType } from "../types/types";
import { List } from "antd";
export interface Tweets {
  hits: TweetsType[];
  status: string;
}
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
              renderItem={item => <List.Item>{item.title}</List.Item>}
            />
          ) : null}
        </div>
      )}
    </>
  );
};
export default ChildComponent;
