import { IAuthenticationModel } from "@src/models/AuthenticationModel";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type TRootState = {
  auth: IAuthenticationModel;
};

const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default useAppSelector;
