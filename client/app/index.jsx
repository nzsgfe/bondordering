import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home/Home';
import OrderDetail from './components/order/OrderDetail';
import App from './components/App'

ReactDOM.render(
    <Router>
            <Routes>
                    <Route path={"/"} element={<App />}>
                        <Route index element={<OrderDetail />} />
                        <Route path={"test"} element={<Home />} />
                    </Route>
            </Routes>
    </Router>
   ,document.querySelector("#main")
);