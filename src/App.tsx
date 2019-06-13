import React, { createContext, useState } from "react";
import UseTwitterCallBackAndMemo from "./components/UsePunkCallBackAndMemo";
import PunksReducer from "./components/UsePunkReducer";
import InfiniteScroll from "./components/UsePunkState";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
const { Header, Footer, Content } = Layout;

type Hooks = "React Hooks";
export const HooksContext = createContext<Hooks>("React Hooks");
const App: React.FC = () => {
  const [state,setState]=useState<string>("useState");

    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["useState"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item onClick={() => setState("useState")}>
                {" "}
                Use State Example
              </Menu.Item>
              <Menu.Item  onClick={() => setState("useReducer")}>
                {" "}
                Use Reducer Example
              </Menu.Item>
              <Menu.Item onClick={() => setState("useCallback")}>
                {" "}
                Use Callback Example{" "}
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 250px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <HooksContext.Provider value="React Hooks">
                {state === "useState" ? (
                  <InfiniteScroll />
                ) : state === "useReducer" ? (
                  <PunksReducer />
                ) : (
                  <UseTwitterCallBackAndMemo />
                )}
              </HooksContext.Provider>
              {/* <List /> */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Searching of Content</Footer>
        </Layout>
      </div>
    );
}

export default App;
