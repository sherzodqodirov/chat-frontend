import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import RouterPages from "./pages/RouterPages";

function App() {

    return (
        <BrowserRouter>
                <RouterPages/>
        </BrowserRouter>
    );
}

export default App;
