import { createSlice} from "@reduxjs/toolkit";

const litableSlice = createSlice({
    name: "litable",
    initialState: {
        value: 0
    },
    reducers:
    {
        incrementer: (state) => {
            state.value++
        }
    }
})


export const {incrementer} = litableSlice.actions
export default litableSlice