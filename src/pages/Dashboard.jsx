import React from 'react';
import styled from "styled-components";

const Dashboard = () => {
    return (
        <Container>
           <BoxImg>
               <img style={{width:"100%"}} src="assets/chat.png" alt="img"/>
           </BoxImg>
        </Container>
    );
};

const BoxImg=styled.div`
width:300px;
  height:300px;
`
const Container=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export default Dashboard;
