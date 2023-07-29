
export const BASE_URL = 'https://chat-api-fkmg.onrender.com';

export const AUTH_URL ={
    register:"/auth/register",
    login:"/auth/login",
    allusers:"/auth/users/",
    oneusers:"/auth/user/",
}

export const CHAT_GET_URL = (sender,receiver) =>`${BASE_URL}/chat/?senderId=${sender}&receiverId=${receiver}`
export const CHAT_TEXT_URL=`${BASE_URL}/chat`
export const CHAT_UPLOAD_URL=`${BASE_URL}/chat/upload`