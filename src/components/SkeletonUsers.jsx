import React from 'react';
import {Skeleton, Stack} from "@mui/material";
import Box from "@mui/material/Box";

const SkeletonUsers = () => {
    return (
        <Box sx={{padding:1,}}>
            <Stack spacing={1} direction="row" alignItems="center">
                <Skeleton sx={{bgcolor: 'grey.600'}} variant="circular" animation="wave" width={50} height={50}/>
                <Skeleton sx={{bgcolor: 'grey.600'}} variant="rectangular" animation="wave" width={"100%"} height={30}/>
            </Stack>
        </Box>
    );
};

export default SkeletonUsers;
