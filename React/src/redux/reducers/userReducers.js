import { createSlice } from '@reduxjs/toolkit';
const initialState={
    myUser:{
        "id": -1,
        "username": "",
        "password": "",
        "email": "",
        "phone": "",
        "points":"0",
        "profile": "",
      //  "dateOfBirth": "",
        "status": 1, 
        "admin":false  ,   
        "like_count":0,
          "win_count" :0
   
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        updateUser:(state,action)=>{
            state.myUser=action.payload
        },
        getUser: (state, action) => {
            state.myUser = action.payload;
        },
    },
})

export const { updateUser ,getUser} = userSlice.actions

export default userSlice.reducer