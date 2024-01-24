import { createSlice } from "@reduxjs/toolkit"


interface Status{
    status: 'loading' | 'error' | 'idle'
}

const initialState = {status: 'idle'}

const store = createSlice({
    name: 'status',
    initialState,
    reducers: {
        
    }
})