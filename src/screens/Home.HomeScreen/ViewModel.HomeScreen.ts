import AuthenticationState from "@src/globalState/AuthenticationState/AuthenticationState";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import React from "react";

const ViewModel = () => {
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((state) => state);

  const _handleLogout = React.useCallback(() => {
    dispatch(AuthenticationState.actions.logOutAction());
  }, [dispatch]);

  return {
    auth,
    _handleLogout,
  };
};

export default ViewModel;
