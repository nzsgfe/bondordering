import React from 'react';

export default class MessageDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { onMessageDialogClose } = this.props;

        return (
            <div className="overlay" >
                <div className="overlay-text">Success or Error ...</div>
            </div>
        );
    }

}