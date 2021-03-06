import React, { Fragment, useState, useEffect } from "react";
import { Punks } from "../../interfaces/interface";
import { List, Spin, Alert, Avatar } from "antd";

const UseCallBackChild = ({ action, debouncedSearchTerm }: any) => {
  const [value, setValue] = useState<Punks>({ hits: [], status: "" });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    if (debouncedSearchTerm) setValue({ hits: [], status: "" });
    setTimeout(() => {
      action().then((res: any) => {
        if (res.hits.length) setValue(res);
        setIsFetching(false);
      });
    }, 2000);
  }, [action, debouncedSearchTerm]);

  return (
    <Fragment>
      {value.status === "success" && (
        <div>
          {value.hits ? (
            <List
              bordered
              dataSource={value.hits}
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
          ) : null}
        </div>
      )}

      {isFetching && (
        <div className="spinner">
          <Spin />
          <Alert message="Fetching Records ..." type="info" />
        </div>
      )}
    </Fragment>
  );
};
export default UseCallBackChild;
