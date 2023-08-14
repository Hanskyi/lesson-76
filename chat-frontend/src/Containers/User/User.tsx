import React, {useEffect, useState} from 'react';
import Message from "../../Components/Message/Message";
import {IPost, IPosts} from "../../types";
import {Container, Grid, Typography} from "@mui/material";
import FormUser from "./FormUser";
import axiosApi from "../../axiosApi";
import {useLocation} from "react-router-dom";

const User = () => {
    const [inputValue, setInputValue] = useState<IPost>({
        author: '',
        message: ''
    });

    const [posts, setPosts] = useState<IPosts[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const date = useLocation().search;
    const searchParams = new URLSearchParams(date);
    const dateTime = searchParams.get('datetime');


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const getFirstResponse = async () => {
        const response =  dateTime ? await axiosApi.get<IPosts[] | null>(`?datetime=${dateTime}`) : await axiosApi.get<IPosts[] | null>('/');
        const messages = response.data;

        if (messages !== null) {
            if (posts.length > 0) {
                setPosts((prevState) => {
                    const filteredPosts = messages.filter((post: IPosts) =>
                        prevState.every((newPost: IPosts) => newPost.id !== post.id)
                    );
                    return [...prevState, ...filteredPosts];
                });
            }
                setPosts(messages);

        }
        if(messages === null){
            setPosts([]);
        }
    };

    const onclickSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.message !== '' && inputValue.author !== '') {
            setLoading(true);
            await axiosApi.post('/add', inputValue);
            setInputValue({author: '', message: ''});
            setLoading(false);
        }
    };

        useEffect(() => {
            void getFirstResponse();
        }, []);

        useEffect(() => {
            const interval = setInterval(getFirstResponse, 3000);
            return () => {
                clearInterval(interval);
            };
        }, [posts]);


        const Memoized = React.memo(Message);

        return (
            <Container maxWidth="lg" sx={{marginTop: "50px", textAlign: "center"}}>
                <Typography variant="h5"><strong>Chat</strong></Typography>
                <Grid mb={5} sx={{overflowY: "scroll", height: "600px"}}>
                    {posts.map(post => {
                        return <Memoized key={post.id} post={post}/>
                    })}
                </Grid>

                <FormUser
                    onChangeInput={onChangeInput}
                    inputValue={inputValue}
                    onclickSendMessage={onclickSendMessage}
                    loading={loading}
                />
            </Container>
        );
    };

    export default User;


