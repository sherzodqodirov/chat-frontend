import React from 'react';
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

const ProfileInfoModal2 = () => {
    const {oneUserInfo, status} = useSelector(state => state.oneUserSlice)

    return (
        <Container>
            <AvatarBox>
                <Avatar
                    alt="img"
                    src={oneUserInfo?.profilePicture}
                    sx={{width: 56, height: 56}}
                />
                <Typography color={"#FFF"}>{oneUserInfo.firstname + " " + oneUserInfo.lastname}</Typography>
            </AvatarBox>
            <Typography mt={2} color={"#FFF"}>First name : {oneUserInfo?.firstname}</Typography>
            <Typography mt={2} color={"#FFF"}>Last name : {oneUserInfo?.lastname}</Typography>
            <Typography mt={2} color={"#FFF"}>Email : {oneUserInfo?.email}</Typography>
        </Container>
    );
};
const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`
const Container = styled.div`

`

export default ProfileInfoModal2;
