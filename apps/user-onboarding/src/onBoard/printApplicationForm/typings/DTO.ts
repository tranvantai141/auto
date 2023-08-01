import { ResponseDTO } from 'src/typings/global';

export type GenFormURL = {
  combinedForm?: string;
  applicationFormURL?: string;
  complianceForm?: string;
  pdfUrl?: string;
};

export type GetListGeneratedFormDTO = ResponseDTO & {
  generatedFormURLs?: GenFormURL | null | undefined;
  pdfUrl?: string | null | undefined;
};

export type flagChangeInfo = {
  isChangeInfo?: boolean;
  isAddCard?: boolean;
  isAddDigiBank?: boolean;
  isHaveAcount?: boolean;
  isFatca?: boolean;
};
