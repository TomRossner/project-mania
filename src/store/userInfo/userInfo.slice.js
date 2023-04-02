// import { createSlice } from "@reduxjs/toolkit";
// import { getUserInfo } from "../../httpRequests/http.auth";

// const INITIAL_STATE = {
//     user_info: null,
//     loading: false,
//     error: null
// }

// const userInfoSlice = createSlice({
//     name: 'userInfo',
//     INITIAL_STATE,
//     reducers:
//     {
//         setUserInfo: (state, action) => {
//             state.user_info = action.payload;
//         },
//         fetchUserInfoStart: (state) => {
//             state.loading = true;
//         },
//         fetchUserInfoSuccess: (state, action) => {
//             state.user_info = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         fetchUserInfoFailed: (state, action) => {
//             state.loafing = false;
//             state.error = action.payload;
//         }
//     }
// })

// export const {
//     setUserInfo,
//     fetchUserInfoFailed,
//     fetchUserInfoStart,
//     fetchUserInfoSuccess
// } = userInfoSlice.actions;

// export default userInfoSlice.reducer;

// export const fetchUserInfoAsync = (id) => async (dispatch) => {
//     dispatch(fetchUserInfoStart());
  
//     try {
//       const { data: userInfo } = await getUserInfo(id);
//       dispatch(fetchUserInfoSuccess(userInfo));
//     } catch (error) {
//       dispatch(fetchUserInfoFailed(error));
//     }
//   };