import React, { FC } from "react";
import ReactDOM from "react-dom";
import "./style.less";

const App: FC = () => {
    return <div id="app">hello world</div>;
};
ReactDOM.render(<App></App>, document.getElementById("root"));
