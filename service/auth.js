// const sessionIdToUserMap=new Map();

// export const setUser=(id,user)=>{
//     sessionIdToUserMap.set(id,user);
// }

// export const getUser=(id)=>{
//     return sessionIdToUserMap.get(id);
// }

import jwt from 'jsonwebtoken';

export const setUser=(user)=>{
    return jwt.sign({
        _id:user._id,
        email:user.email
    },process.env.SECRET_KEY);
}


export const getUser=(token)=>{
    if(!token)return null;
    return jwt.verify(token,process.env.SECRET_KEY);
}