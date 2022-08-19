import React from "react";
import "./App.css";
// import BasicTypes from "./BasicTypes";
// import { Interface } from "./Interface";
// const { Interface } = require("./Interface");
// import Classes from "./Classes";
// import Functions from "./Functions";
import Generics from "./Generics";
// import Enum from "./Enum";
// import TypeCompatibility from "./TypeCompatibility";
// import AdvancedTypes from "./AdvancedTypes";

const App: React.FC = () => {
    // BasicTypes.test();
    Generics.test2();
    return (
        <div className="App">
            <header className="App-header">Learn TypeScript</header>
        </div>
    );
};

export default App;
