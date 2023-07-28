import React from 'react';
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

const ProfileInfoModal = () => {
    const {userInfo} = useSelector(state => state.userSlice)

    return (
        <Contnainer>
            <AvatarBox>
                <Avatar
                    alt="Remy Sharp"
                    src={userInfo.profilePicture}
                    sx={{width: 56, height: 56}}
                />
                <Typography color={"#FFF"}>{userInfo.firstname + " " + userInfo.lastname}</Typography>
            </AvatarBox>
            <Typography mt={2} color={"#FFF"}>First name : {userInfo.firstname}</Typography>
            <Typography mt={2} color={"#FFF"}>Last name : {userInfo.lastname}</Typography>
            <Typography mt={2} color={"#FFF"}>Email : {userInfo.email}</Typography>
        </Contnainer>
    );
};
const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`
const Contnainer = styled.div`

`

export default ProfileInfoModal;
