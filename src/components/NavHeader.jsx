import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Box from "@mui/material/Box";
import {IconButton, Menu, MenuItem, Modal, Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserData} from "../redux/slice/userSlice";
import ProfileInfoModal from "./ProfileInfoModal";
import {AiOutlineClose} from "react-icons/ai";
import {getOneUserData} from "../redux/actions/oneUserAction";
import ProfileInfoModal2 from "./ProfileInfoModal2";
import {clearDataOneUser} from "../redux/slice/oneUserSlice";

const NavHeader = () => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const {oneUserInfo, status} = useSelector(state => state.oneUserSlice)
    const {id} = useParams()


    useEffect(() => {
        dispatch(getOneUserData(id))
    }, [id]);


    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);

    const settings = ['Profile', 'Logout'];
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting == 'Logout') {
            dispatch(clearUserData())
            dispatch(clearDataOneUser())
            navigate("/login")
        }

        if (setting == 'Profile') {
            handleOpen()
        }

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: "80vh",
        bgcolor: "rgb(23 33 43)",
        boxShadow: 24,
        p: 2,
        borderRadius: "10px",
    };


    return (
        <Container>

            <Box sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 15px'
            }}>
                <Box onClick={handleOpen2}>
                    <UserBox>
                        {oneUserInfo !== null ? (
                            <>
                                <Avatar src={oneUserInfo?.profilePicture}/>
                                <UserTitile>
                                    {oneUserInfo?.firstname + " " + oneUserInfo?.lastname}
                                </UserTitile></>) : null}

                    </UserBox>
                </Box>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <BsThreeDotsVertical size={30} color={'#607484'}/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>


            {/****modal my profil*******/}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseBtnBox>
                        <IconButton aria-label="close" size="large" onClick={handleClose}>
                            <AiOutlineClose color={"rgb(115 126 135)"}/>
                        </IconButton>
                    </CloseBtnBox>
                    <ProfileInfoModal/>
                </Box>
            </Modal>


            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseBtnBox>
                        <IconButton aria-label="close" size="large" onClick={handleClose2}>
                            <AiOutlineClose color={"rgb(115 126 135)"}/>
                        </IconButton>
                    </CloseBtnBox>
                    <ProfileInfoModal2/>
                </Box>
            </Modal>
        </Container>
    );
};

const CloseBtnBox = styled.div`
  display: flex;
  justify-content: end;
`

const UserTitile = styled.div`
  color: #FFFFFF;
`

const UserBox = styled.div`
  padding: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(23 33 43);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

`
export default NavHeader;
