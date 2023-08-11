import React, {useEffect, useState} from 'react';
import './user.css';
import Message from "../../Components/Message/Message";
import {IPosts} from "../../types";

const baseUrl = 'http://146.185.154.90:8000/messages';
const User = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [message, setMessage] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [dateTime, setDateTime] = useState<string>('');

    const onChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const onChangeInputAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    const getFirstResponse = async () => {
        const response = await fetch(baseUrl);
        if (response.ok) {
            const parseResponse: IPosts[] = await response.json() as IPosts[];
            setPosts(parseResponse);
            setDateTime(parseResponse[parseResponse.length - 1].datetime);
        }
    };

    const onclickSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message !== '' && author !== '') {
            const data = new URLSearchParams();
            data.set('message', `${message}`);
            data.set('author', `${author}`);
            setMessage('');
            setAuthor('');
            await fetch(baseUrl, {
                method: 'POST',
                body: data,
            });
        }
    };


    const getMessage = async () => {
        if (dateTime.length > 0) {
            const url = `${baseUrl}?datetime=${dateTime}`;
            console.log(url);
            const response = await fetch(url);
            const responseParse = await response.json();
            console.log(responseParse);
            if (responseParse.length > 0) {
                setPosts((prevState) => {
                    const filteredPosts = responseParse.filter((post: IPosts) =>
                        prevState.every((newPost: IPosts) => newPost._id !== post._id)
                    );
                    return [...prevState, ...filteredPosts];
                });
                setDateTime(responseParse[responseParse.length - 1].datetime);
            }
        }
    };
    useEffect(() => {
        getFirstResponse();
    }, [])

    useEffect(() => {

        const interval =  setInterval(getMessage, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [posts]);


    const Memoized = React.memo(Message);


    return (
        <div className="container">
            <div className="message-container">
                {posts.map(post => {
                    return <Memoized key={post._id} post={post}/>
                })}
            </div>

            <form className="header">
                <div className="input-container">
                    <input required onChange={onChangeInputMessage} value={message} type="text"
                           className="input-massage-text input"/>
                    <input required onChange={onChangeInputAuthor} value={author} type="text"
                           className="input-massage-author input"/>
                </div>
                <div className="">
                    <button onClick={onclickSendMessage}>отправить</button>
                </div>
            </form>
        </div>
    );
};

export default User;


