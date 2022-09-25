import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from "./state/state";
import { reducer } from "./state/reducer";

ReactDOM.render(
    <StateProvider reducer={reducer}>
        <App />
    </StateProvider>,
    document.getElementById('root')
);