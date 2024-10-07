import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        error: null, // To track any errors during the fetch
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export actions
export const { setLoading, setUser, setError } = authSlice.actions;

// Thunk function to fetch user profile
export const fetchUserProfile = () => async (dispatch) => {
    dispatch(setLoading(true)); // Start loading

    try {
        const response = await axios.get(`${USER_API_END_POINT}/profile`, { withCredentials: true });
        dispatch(setUser(response.data.user)); // Set user data in Redux state
        dispatch(setError(null)); // Clear any existing errors
    } catch (error) {
        dispatch(setError(error.response?.data?.message || "Failed to fetch user profile")); // Set error message
    } finally {
        dispatch(setLoading(false)); // Stop loading
    }
};

export default authSlice.reducer;
