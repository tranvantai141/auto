import axiosTokenInstance from '../../../../service/network/axios';

export const getPdfLink = (url: string, data: any) => {
  try {
    return axiosTokenInstance({
      method: 'POST',
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      return resp.data;
    });
  } catch (error) {
    console.error(error);
  }
};
