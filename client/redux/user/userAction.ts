import { IUser } from "../../dto/user.dto";
import { AppThunk } from "../store";
import userSlice from "./userSlice";

export const setUser = (user: IUser): AppThunk => {
    return async dispatch => {
        dispatch(
            userSlice.actions.setUser(user)
        );
    };
}