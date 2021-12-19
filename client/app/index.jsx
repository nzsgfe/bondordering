import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home/Home';
import Order from './components/order/Order';
import OrderList from './components/order/OrderList';
import App from './components/App'

ReactDOM.render(
    <Router>
            <Routes>
                    <Route path={"/"} element={<App/>}>
                        <Route index element={<Order/>} />
                        <Route path={"test"} element={<Home/>} />
                        <Route path={"/order/add"} element={<Order/>} />
                        <Route path={"/order/list"} element={<OrderList/>} />
                    </Route>
            </Routes>
    </Router>
   ,document.querySelector("#main")
);