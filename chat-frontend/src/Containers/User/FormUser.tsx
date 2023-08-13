import React from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {IPost} from "../../types";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
    onChangeInput: React.ChangeEventHandler<HTMLInputElement>,
    inputValue: IPost,
    onclickSendMessage: React.MouseEventHandler<HTMLButtonElement>,
    loading: boolean
}
const FormUser: React.FC<Props> = ({onChangeInput,inputValue,onclickSendMessage,loading}) => {
    return (
        <Grid component="form" container display="flex" alignItems="center" justifyContent="space-between" maxWidth={900}>
            <Grid item >
                <Grid component={TextField}
                    onChange={onChangeInput}
                    id="outlined-basic"
                    label="message"
                    variant="outlined"
                    value={inputValue.message}
                    name="message"
                    required
                      sx={{marginRight: "10px"}}
                />

                <Grid component={TextField}
                    onChange={onChangeInput}
                    id="outlined-basic"
                    label="author"
                    variant="outlined"
                    value={inputValue.author}
                    name="author"
                    required
                />
            </Grid>

           <Grid item>

               {loading ?
                   <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
                       Fetch data
                   </LoadingButton> :
                   <Button sx={{marginLeft: "auto"}}
                           onClick={onclickSendMessage}
                           variant="contained" endIcon={<SendIcon />}
                   >
                       Отправить
                   </Button>

               }



           </Grid>
        </Grid>
    );
};

export default FormUser;