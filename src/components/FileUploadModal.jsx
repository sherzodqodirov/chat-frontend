import React, {useState} from 'react';
import styled from "styled-components";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import axios from "axios";
import {CHAT_UPLOAD_URL} from "../utils/apiUrl";

const FileUploadModal = ({setOpen}) => {

    const [file, setFile] = useState(null)
    const {userInfo} = useSelector(state => state.userSlice)
    const {oneUserInfo} = useSelector(state => state.oneUserSlice)
    const handleSubFile = (e) => {

        e.preventDefault();
        const data = {
            sender: userInfo._id,
            receiver: oneUserInfo._id,
            content: file
        }
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key])
        }
        axios.post(CHAT_UPLOAD_URL, formData)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))

        setOpen(false)

    }

    return (
        <Container>
            <form onSubmit={handleSubFile}>
                <Box sx={{display: "flex", justifyContent: "center",}}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        {file ? file.name.length < 15 ? file.name : file.name.substring(0, 15) + "...." : "Choose a file"}

                        <input
                            type="file"
                            hidden
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </Button>
                </Box>

                <Box sx={{display: "flex", justifyContent: "end",}}>
                    <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={() => setOpen(false)}>cancel</Button>
                        <Button type={"submit"} variant="text">send</Button>
                    </Stack>
                </Box>

            </form>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  height: 100%;


  form {
    width: 100%;
    height: 100%;
    display: grid;
    align-content: space-between;
  }
`
export default FileUploadModal;
