import React, { Component, createContext } from "react";
import Tweets from "./components/Tweets";
import UseTwitterCallBackAndMemo from "./components/UseTwitterCallBackAndMemo";
//import TweetsReducer from "./components/useTweetsReducer";
import List from "./components/infiniteScroll";
import {  Layout, Menu } from "antd";
import {MainState}from "./types"
import "antd/dist/antd.css";
const { Header, Footer, Content } = Layout;

type Hooks = "React Hooks";
export const HooksContext = createContext<Hooks>("React Hooks");
class App extends Component<{}, MainState> {
  state: MainState = {
    type: "useCallback"
  };
  public handleClick(event: any): void {
    this.setState({ type: event.key });
  }

  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["useCallback"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="useState" onClick={e => this.handleClick(e)}>
                {" "}
                Use State Example
              </Menu.Item>
              <Menu.Item key="useReducer" onClick={e => this.handleClick(e)}>
                {" "}
                Use Reducer Example
              </Menu.Item>
              <Menu.Item key="useCallback" onClick={e => this.handleClick(e)}>
                {" "}
                Use Callback Example{" "}
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 250px" }}>

            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {/* <HooksContext.Provider value="React Hooks">
                {this.state.type === "useState" ? (
                  <Tweets />
                ) : this.state.type === "useReducer" ? (
                  <TweetsReducer />
                ) : (
                  <UseTwitterCallBackAndMemo />
                )}
              </HooksContext.Provider> */}
              <List />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Searching of Content</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
