import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Box from "@mui/material/Box";
import {IconButton, Modal} from "@mui/material";
import {ImAttachment} from "react-icons/im";
import {IoSend} from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import {AiOutlineClose} from "react-icons/ai";
import ProfileInfoModal from "../components/ProfileInfoModal";
import FileUploadModal from "../components/FileUploadModal";
import {useSelector} from "react-redux";
import axios from "axios";
import {MdInsertDriveFile} from "react-icons/md"
import {BASE_URL, CHAT_GET_URL, CHAT_TEXT_URL} from "../utils/apiUrl";
import {useParams} from "react-router-dom";
import io from "socket.io-client";

const UsersChat = () => {

    const socket = useRef();


    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [allData, setAllData] = useState([])

    const {userInfo,} = useSelector(state => state.userSlice)
    const {oneUserInfo, status} = useSelector(state => state.oneUserSlice)

    useEffect(() => {
        if (userInfo) {
            socket.current = io(BASE_URL);
            socket.current.emit("add-user", userInfo._id);
        }
    }, [userInfo]);


    useEffect(() => {
        status === "success" && axios.get(CHAT_GET_URL(userInfo?._id, oneUserInfo?._id))
            .then(res => setAllData(res.data))
            .catch(err => console.error(err))

        socket.current.on('res', (data) => setAllData([...allData, data]));
    }, [oneUserInfo,allData])


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleOnEnter(text) {
        if (text.trim() === "") {
            console.log("not text");
        }
        const data = {
            sender: userInfo._id,
            receiver: oneUserInfo._id,
            content: text,
            contentType: 'text'
        }
        socket.current.emit("send-msg", data);

        axios.post(CHAT_TEXT_URL, data)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))

    }

    function handleOnClick() {
        if (text.trim() === "") {
            console.log("not text");
        }
        const data = {
            sender: userInfo._id,
            receiver: oneUserInfo._id,
            content: text,
            contentType: 'text'
        }
        socket.current.emit("send-msg", data);

        axios.post(CHAT_TEXT_URL, data)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))

        setText("")
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: "30vh",
        bgcolor: "rgb(23 33 43)",
        boxShadow: 24,
        p: 4,
        borderRadius: "10px",
    };

    return (
        <Container>
            <ChatBox>
                {allData.map((item, key) => (
                    <Box key={key} sx={{
                        display: "flex",
                        justifyContent: `${item.sender == userInfo._id && "end" || "start"}`,
                    }}>
                        {item.contentType === "text" ? (<ItemMessage bgColor={item.sender == userInfo._id}>
                            <p>{item.content}</p>

                        </ItemMessage>) : (<ItemMessage bgColor={item.sender == userInfo._id}>
                            <FileBox href={BASE_URL+item.content} download={`file-${key}`} target="_blank">
                               <Box sx={{
                                   display:"inline-flex",
                                   justifyContent:"center",
                                   alignItems:"center",
                                   padding:"10px",
                                   borderRadius:"100%",
                                   background:"#3f96d0"
                               }}>
                                   <MdInsertDriveFile size={"25"}/>
                               </Box>
                                <p>{"File"+"-"+key+"."+item.content.split('.').pop()}</p>
                            </FileBox>

                        </ItemMessage>)}

                    </Box>
                ))}


            </ChatBox>

            <BoxInput>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <IconButton
                        sx={{
                            width: "100%",
                            height: "100%",
                            border: 'none',
                        }}
                        onClick={handleOpen}
                        component="label"
                    >
                        <ImAttachment size={30} style={{color: "#6a7580"}}/>
                        <input

                            hidden
                        />

                    </IconButton>

                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* <InputM type="text" placeholder="to write a message..." />*/}
                    <InputEmoji
                        required
                        borderRadius={0}
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        shouldReturn
                        onEnter={handleOnEnter}
                        placeholder="to write a message..."
                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <IconButton aria-label="attachment" size="large" onClick={handleOnClick}>
                        <IoSend style={{color: "rgb(82 136 193)"}} fontSize="inherit"/>
                    </IconButton>
                </Box>

            </BoxInput>

            {/*********modal upload file **********/}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FileUploadModal setOpen={setOpen}/>
                </Box>
            </Modal>


        </Container>
    );
};

const FileBox=styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`
const ItemMessage = styled.div`
  position: relative;
  overflow-y: hidden;
  width: 200px;
  min-height: 30px;
  margin: 15px 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 5px;
  background-color: ${props => props.bgColor && "rgb(43 82 120)" || "#182533"};
  color: #fff;

  p {

  }

  span {
    color: #548aa9;
    font-size: 12px;
    position: absolute;
    right: 7px;
    bottom: 1px;
  }
`
const ChatBox = styled.div`
  width: 100%;
  height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`
const BoxInput = styled.div`
  position: absolute;
  bottom: 2px;
  width: 100%;
  height: 50px;
  background-color: #17212b;
  display: grid;
  grid-template-columns: 0.05fr 1fr 0.1fr;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export default UsersChat;
