import React from "react";
import "./App.css";
import BasicTypes from "./BasicTypes";

const App: React.FC = () => {
    BasicTypes.init();
    return (
        <div className="App">
            <header className="App-header">Learn TypeScript</header>
        </div>
    );
};

export default App;
