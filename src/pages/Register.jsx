import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import {AUTH_URL, BASE_URL} from "../utils/apiUrl";
import {registerPost} from "../services/servicesData";
import {useDispatch, useSelector} from "react-redux";
import {registerUserAction} from "../redux/actions/userActions";
import {userSlice} from "../redux/slice/userSlice";

const Register = () => {
    const [file, setFile] = useState('');
    const [btnDis, setBtnDis] = useState(false);
    const dispatch=useDispatch()
    const {status}=useSelector(state => state.userSlice)
    const navigate=useNavigate()

    useEffect(() => {
        if(status=="success"){
            navigate("/chat")
        }

    }, [status]);

    useEffect(() => {
        setBtnDis(file === '');
    }, [file]);

    function Copyright(props) {
        return (
            <Typography variant="body2" color="#FFF" align="center" {...props}>
                {'Sherzod Qodirov © '}
                <Link color="inherit" target="_blank" href="https://sherzodqodirov.github.io/myportfoliosayt">
                    Website
                </Link>
                {new Date().getFullYear()}
            </Typography>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value,
            profilePicture: event.target.file.files[0],
        };
        const formData = new FormData()
        for (let key in data) {
            formData.append(`${key}`, data[key])
        }

        dispatch(registerUserAction(formData))

    };

    const WhiteBorderTextField = styled(TextField)(({ theme }) => ({
        '& label.Mui-focused': {
            color: '#FFFFFF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'silver',
        },
        '& .MuiOutlinedInput-root': {
            color: '#FFF',
            backgroundColor: '#6374a8',
            outline: '#FFFFFF',
            '& fieldset': {
                borderColor: 'silver',
                color: '#FFFFFF',
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                backgroundColor: '#1f2936',
            }}
        >
            <Box
                sx={{
                    width: '380px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="#fff">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: { color: '#FFFFFF' },
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First name"
                        name="firstname"
                    />
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: { color: '#FFFFFF' },
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last name"
                        name="lastname"
                    />
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: { color: '#FFFFFF' },
                        }}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <WhiteBorderTextField
                        InputLabelProps={{
                            style: { color: '#FFFFFF' },
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
                    <Button variant="contained" component="label" sx={{ mt: 1 }}>
                        {file === '' ? 'Upload avatar' : file.name}
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" name="avatar" id="file" hidden accept=".jpg,.png" />
                    </Button>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={btnDis}>
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {'Do have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default Register;
