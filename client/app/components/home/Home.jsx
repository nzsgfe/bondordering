import React from 'react';
import Order from '../order/Order';

export default class Home extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
            <React.Fragment><div>I am home</div><Order /></React.Fragment>
        );
    }

}