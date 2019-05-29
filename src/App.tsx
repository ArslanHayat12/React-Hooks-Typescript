import React, { Component, createContext } from "react";
import Tweets from "./components/Tweets";
import UseTwitterCallBackAndMemo from "./components/UseTwitterCallBackAndMemo";
import TweetsReducer from "./components/useTweetsReducer";
import "antd/dist/antd.css";

interface MainState {
  type: string;
}
type Hooks = "React Hooks";
export const HooksContext = createContext<Hooks>("React Hooks");
class App extends Component<{}, MainState> {
  state: MainState = {
    type: ""
  };
  public handleClick(event: any): void {
    this.setState({ type: event.currentTarget.value });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <h1>Twitter Tweets</h1>
          </div>
        </header>

        <div className="container">
          <button onClick={e => this.handleClick(e)} value="useState">
            Use State Example
          </button>
          <button onClick={e => this.handleClick(e)} value="useReducer">
            Use Reducer Example
          </button>
          <button onClick={e => this.handleClick(e)} value="useCallback">
            Use Callback Example
          </button>
          <HooksContext.Provider value="React Hooks">
            {this.state.type === "useState" ? (
              <Tweets />
            ) : this.state.type === "useReducer" ? (
              <TweetsReducer />
            ) : (
              <UseTwitterCallBackAndMemo />
            )}
          </HooksContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
