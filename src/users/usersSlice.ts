import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type UserState = {
    loading: boolean;
    user?: any;
    error?: any;
}

const defaultState: UserState = {
    loading: false,
    user: null,
    error: null
};

export const loginUser = createAsyncThunk<string, {email: string, password: string}>('users/loginUser', async(userCredential) => {
    let response = await fetch('localhost:4000/user', {
        method: 'POST',
        body: JSON.stringify({email: userCredential.email, password: userCredential.password})
    })

    let userData:{ok: true | false; errors?: string; token?: any | undefined}

    if (response.ok) {
        let data = await response.json()
        userData = JSON.parse(data)
        if (userData.ok) {
            return userData.token as string
        } else {
            throw new Error(userData.errors)
        }
    }
    throw new Error("login error")
})


const usersSlice = createSlice( {
    name: 'users',
    initialState: defaultState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message)
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied! Invalid Credentials'
                } else {
                    state.error = action.error.message
                }

            })
    }
})
export default usersSlice.reducer;