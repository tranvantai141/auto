import { REGISTER_DEVICES } from '@screens/home/api/endpoints';
import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import { onResisterDevicesSuccess, onResisterDevicesError, setLoading } from '../slices/RegisterDevicesSlice';
export const registerDevicesRequest = (param: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        await axiosTokenInstance({
            method: 'post',
            url: REGISTER_DEVICES,
            data: param,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((resp) => {
                dispatch(onResisterDevicesSuccess(resp?.data));
                dispatch(setLoading(false));
            })
            .catch((error: AxiosError) => {
                const _error = {
                    data: error?.response?.data,
                    status: error?.response?.status,
                };
                dispatch(onResisterDevicesError(_error));
                dispatch(setLoading(false));
            });
    } catch (error) {
        dispatch(setLoading(false));
    }
};
