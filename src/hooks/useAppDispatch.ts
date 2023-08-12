import ReduxManager from "@src/globalState/ReduxManager";
import { useDispatch } from "react-redux";

export type TAppDispatch = typeof ReduxManager.store.dispatch;
const useAppDispatch = () => useDispatch<TAppDispatch>();

export type TDispatch = ReturnType<typeof useAppDispatch>;

export default useAppDispatch;
