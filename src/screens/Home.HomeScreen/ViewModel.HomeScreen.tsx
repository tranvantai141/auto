import AuthenticationState from "@src/globalState/AuthenticationState/AuthenticationState";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import React from "react";
import { showToastable } from "react-native-toastable";

const ViewModel = () => {
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((state) => state);

  React.useEffect(() => {
    showToastable({
      title: "Hooray 🤩🤩",
      message: "Thanks, this is the end of the demo 😍",
      status: "success",
      duration: 4000,
    });
  }, []);

  const _handleLogout = React.useCallback(() => {
    dispatch(AuthenticationState.actions.logOutAction());
  }, [dispatch]);

  return {
    auth,
    _handleLogout,
  };
};

export default ViewModel;
