import React from 'react';
import './message.css';
import {IPosts} from "../../types";

interface Props {
    post:IPosts
}

const Message: React.FC<Props> = (props) => {
    return (
        <div className="message-box">
            <span className="message-text">{props.post.message}</span>
            <div className="message-info">
                <span className="message-author">{props.post.author}</span>
                <span className="message-date">{props.post.datetime}</span>
            </div>
        </div>
    );
};

export default Message;