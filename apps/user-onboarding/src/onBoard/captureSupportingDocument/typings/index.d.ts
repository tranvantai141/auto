import { ResponseDTO } from 'src/typings/global';

export type PreSignSupportingDocumentDTO = ResponseDTO & {
  presignUrls: string[];
};
