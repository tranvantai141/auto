import React from "react";
import { useAppDispatch } from "@src/hooks";
import AuthenticationState from "@src/globalState/AuthenticationState/AuthenticationState";
import { IUserOnboardInformation } from "../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";

const ViewModel = (params: { userInformation: IUserOnboardInformation }) => {
  const dispatch = useAppDispatch();

  const _handleLogin = React.useCallback(() => {
    dispatch(
      AuthenticationState.actions.setLoginSuccessAction({
        access_token: "new access token here",
        refresh_token: "this is refresh token",
      }),
    );
  }, [dispatch]);

  const _handleLogout = React.useCallback(() => {
    dispatch(AuthenticationState.actions.logOutAction());
  }, [dispatch]);

  return {
    _handleLogin,
    _handleLogout,
    userInformation: params.userInformation,
  };
};

export default ViewModel;
