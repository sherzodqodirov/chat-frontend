import React, {useEffect} from 'react';
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import {Link, NavLink} from "react-router-dom";
import {FaTelegram} from "react-icons/fa";
import Box from "@mui/material/Box";
import {RiMenuFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {btnClick} from "../redux/slice/btnSlice";
import {IconButton} from "@mui/material";
import axios from "axios";
import {AUTH_URL, BASE_URL} from "../utils/apiUrl";
import {getAllUserData} from "../redux/actions/allUserActions";
import SkeletonUsers from "./SkeletonUsers";

const NavBar = () => {
    const {btn} = useSelector(state => state.btnState)
    const dispatch = useDispatch()
    const {_id}=useSelector(state => state.userSlice.userInfo)
    const {allUserInfo,status} = useSelector(state => state.allUserSlice)

    useEffect(() => {
       dispatch(getAllUserData(_id))
    }, []);



    const handleBtn = () => {
        btn === "open" && dispatch(btnClick("close"))
        btn === "close" && dispatch(btnClick("open"))
    }

    return (
        <Container>
            <NavTop>
                <NavBrandBox>
                    {btn === "open" && <Link to="/chat">
                        <Box className="brandbox" display={"flex"} alignItems="center" gap="15px">
                            <FaTelegram size={35}/> <h1>ShefGram</h1>
                        </Box>
                    </Link>}
                    <IconButton  onClick={handleBtn}aria-label="menu-button" size="large" sx={{cursor: "pointer", color: "#607484"}}>
                        <RiMenuFill size={30}/>
                    </IconButton>
                </NavBrandBox>
            </NavTop>
            <UserCoreBox>
                {
                 status === null ||   status === "loading" ? Array.from({length:5}).map((item,index)=>(
                     <SkeletonUsers key={index}/>
                     )) :
                    allUserInfo && allUserInfo.map((item, key) => (
                    <NavLink to={"user/" + item?._id} key={key} style={{textDecoration: "none"}}>
                        <UserBox>
                            <Avatar src={item.profilePicture}/>
                            {btn == "open" && <UserTitile>
                                {item.firstname+" "+item.lastname}
                            </UserTitile>}

                        </UserBox>
                    </NavLink>
                ))}
            </UserCoreBox>
        </Container>
    );
};


const NavBrandBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .brandbox {
    color: #ffffff;
  }
`;

const NavTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(23, 33, 43);
`
const UserTitile = styled.div`
  color: #FFFFFF;
`
const UserCoreBox = styled.div`
  height: 85vh;
  overflow-y: auto;
  a{
    display: block;
    width: 100%;
    &.active{
      background-color: rgb(43 82 120);
      :hover {
        background-color: #242f3d;
      }
    }
    :hover {
      background-color: #242f3d;
    }
  }

`;
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
  min-height: 100%;
  display: grid;
  grid-template-rows: 0.12fr 1fr;
`
export default NavBar;
