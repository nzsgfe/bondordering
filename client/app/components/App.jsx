import React from 'react';
import { Outlet, Link } from "react-router-dom";

export default class App extends React.Component {

    constructor(){
        super();
    }

    render(){
        return <Outlet />;
    }

}