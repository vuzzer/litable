import { createSlice } from "@reduxjs/toolkit";
import { ClientType } from "../core/interfaces/clientType";
import { saveClient } from "./thunks/save-client";

// Indicate async operation or async request status
enum Status {loading, error, idle, completed}

interface Entity {
    client?: ClientType,
    status: Status
}

// Initial Value of state
const initialState: Entity = {
    status: Status.idle
}


const store = createSlice({
    name: "client",
    initialState,
    reducers: {
        register(_){
            
        }   
    },
    extraReducers: builder => {
        builder.addCase(
            saveClient.pending, (state) => {
                state.status = Status.loading
            }
        )
        .addCase(
            saveClient.fulfilled, (state) => {
                state.status = Status.completed
            }
        )
        .addCase(
            saveClient.rejected, (state) => {
                state.status = Status.error
            }
        )
    }
})

export const {register} = store.actions
export default store.reducer;