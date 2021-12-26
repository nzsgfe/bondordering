import React from 'react';

export default class MessageDialog extends React.Component {

    constructor(props) {
        super(props);

    }

    copyToClipboard = () => {
        let orderId = this.props.details;
        navigator.clipboard.writeText(orderId);
    }

    render() {
        const {
            title,
            details,
            messageType,
            onConfirm,
            onCancel
        } = this.props;

        let headerBg = messageType;

        return (
            <div className="overlay" >
                <div className="overlay-text">
                    <div className="message-box-style">
                        <div className={"message-header " + headerBg}>{title}</div>
                        <div className="message-info">
                            <div className="orderId-style">{details}
                                {messageType === 'success-message' && <span className="copy-icon-div" onClick={this.copyToClipboard}>
                                    <img className="copyIcon-style" src="../../assets/images/CopyIcon.png" alt="" />
                                </span>}
                            </div>
                            <div className="button-group">
                                {onCancel && <div className="cancel-button" onClick={onCancel}>Cancel</div>}
                                {onConfirm && <div className="submit-button" className="msgbox-confirm-style" onClick={onConfirm}>Ok</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}