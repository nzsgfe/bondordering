import React from 'react';

export default class Loading extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="overlay">
                <div className="overlay-text">Loading...</div>
            </div>
        );
    }

}