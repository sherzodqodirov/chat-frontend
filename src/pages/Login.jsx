import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from "react-router-dom"
import {styled} from '@mui/material/styles';
import {loginPost} from "../services/servicesData";
import jwt from "jwt-decode"
import {useDispatch, useSelector} from "react-redux";
import {loginUserAction} from "../redux/actions/userActions";
import {addUserData, userSlice} from "../redux/slice/userSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {status}=useSelector(state => state.userSlice)

    useEffect(() => {
        if(status=="success"){
            navigate("/chat")
        }

    }, [status]);



    function Copyright(props) {
        return (
            <Typography  variant="body2" color="#FFF" align="center" {...props}>
                {'Sherzod Qodirov © '}
                <Link color="inherit" target="_blank" to="https://sherzodqodirov.github.io/myportfoliosayt">
                    Website
                </Link>
                {new Date().getFullYear()}
            </Typography>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        };

        dispatch(loginUserAction(body))

    };

    const WhiteBorderTextField = styled(TextField)(({theme}) => ({
        '& label.Mui-focused': {
            color: '#FFFFFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'silver',
        },
        '& .MuiOutlinedInput-root': {
            color: "#FFF",
            backgroundColor: '#6374a8',
            outline: '#FFFFFF',
            '& fieldset': {
                borderColor: 'silver',
                color: "#ffffFF",

            },
            '&:hover fieldset': {
                borderColor: 'silver',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'silver',
            },
        },
    }));

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            height: "100vh",
            backgroundColor: "#1f2936",
        }}>
            <Box
                sx={{
                    width: "380px",
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: "100vh",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" color={"#fff"}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: {color: '#FFFFFF'},
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: {color: '#FFFFFF'},
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Copyright sx={{mt: 8, mb: 4}}/>
            </Box>

        </Box>

    );
};

export default Login;
