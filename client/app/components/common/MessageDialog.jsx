import React from 'react';

export default class MessageDialog extends React.Component {

    constructor(props) {
        super(props);

    }

    copyToClipboard = () => {
        let orderId = "this.props.orderId;"
        navigator.clipboard.writeText(orderId);
    }

    onCancel = () => {
        this.props.closeMessageBox;
    }

    render() {
        const {
            title,
            message,
            messageType,
            isWarning,
            isSuccess
        } = this.props;

        let headerBg = messageType;

        return (
            <div className="overlay" >
                <div className="overlay-text">
                    <div className="message-box-style">
                        <div className={"message-header " + headerBg}>{title}</div>
                        <div className="message-info">
                            <div className="orderId-style">{message}
                                {isSuccess && <span className="copy-icon-div" onClick={this.copyToClipboard}>
                                    <img className="copyIcon-style" src="../../assets/images/CopyIcon.png" alt="" />
                                </span>}
                            </div>
                            <div className="button-group">
                                {!isWarning && <div className="cancel-button" onClick={this.onCancel}>Cancel</div>}
                                <div className="submit-button" style={{ marginRight: "15px" }}>{isWarning ? "Continue" : "OK"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}