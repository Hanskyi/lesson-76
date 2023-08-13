import React from 'react';
import {IPosts} from "../../types";
import {Card, CardActionArea, Grid, Typography} from "@mui/material";

interface Props {
    post: IPosts
}

const Message: React.FC<Props> = (props) => {
    return (
        <Card sx={{maxWidth: 900, marginBottom: "5px", padding: "3px"}}>
            <CardActionArea component="div">
                    <Grid container display="flex" justifyContent="space-between" alignItems="center" height={100}>
                       <Grid item display="flex"> <Typography>{props.post.message}</Typography></Grid>
                        <Grid item display="flex" flexDirection="column">
                            <Typography >{props.post.author}</Typography>
                            <Typography>{props.post.datetime}</Typography>
                        </Grid>
                    </Grid>
            </CardActionArea>
        </Card>
    )
};

export default Message;