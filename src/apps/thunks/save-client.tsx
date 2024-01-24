import { createAsyncThunk } from "@reduxjs/toolkit"
import { ClientType } from "../../core/interfaces/clientType"
import { registerClientData } from "../../data/datasources/clientData"

// Sign Up a client
export const saveClient = createAsyncThunk("register", async(client:ClientType) =>{
    await registerClientData(client)
})