import { ResponseDTO } from 'src/typings/global';

export type GetCustomerIdImagesResponse = ResponseDTO & {
  images?: ImageDTO[];
};

export type ImageDTO = {
  imageId?: string;
  imageBase64Content?: string;
  imageDescription?: string;
};
