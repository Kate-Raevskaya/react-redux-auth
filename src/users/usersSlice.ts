import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type UserState = {
    loading: boolean;
    user?: any;
    image?: any;
    error?: any;
}

const defaultState: UserState = {
    loading: false,
    user: null,
    image: null,
    error: null
};

export const loginUser = createAsyncThunk<string, {email: string, password: string}>('users/loginUser', async(userCredential) => {
    let response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userCredential.email, password: userCredential.password})
    })

    // let data:{ok: true | false; errors?: string; token?: any | undefined}

    if (response.ok) {
        let data = await response.json()

        if (data.ok) {
            return data.token as string
        } else {
            throw new Error(data.errors)
        }
    }
    throw new Error("login error")
})

export const registrationUser = createAsyncThunk<any, {email: string, password: string}>('users/registrationUser', async(userCredential) => {
    let response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: userCredential.email, password: userCredential.password})
    })
    if (response.ok) {
        let data = await response.json()

        if (data.ok) {
            return data.token as string
        } else {
            throw new Error(data.errors)
        }
    }
    throw new Error('registration error')
})

export const uploadImage = createAsyncThunk<any, {token: string, image: any}>('users/uploadImage', async(user) => {
    let response = await fetch('http://localhost:4000/account/image', {
        method: 'PUT',
        headers: {'token-tt': user.token},
        body: user.image
    })
    if(response.ok) {
        let data = await response.json()

        if (data.ok) {
            return data.token as string
        } else {
            throw new Error(data.errors)
        }
    }
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
                state.image = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
                state.image = null;
                state.error = null;
                console.log('success')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.image = null;
                state.error = action.error.message
            })
            .addCase(registrationUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.image = null;
                state.error = null;
        })
            .addCase(registrationUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
                state.image = null;
                state.error = null;
                console.log('success')
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.image = null;
                state.error = action.error.message
            })
    }
})
export default usersSlice.reducer;