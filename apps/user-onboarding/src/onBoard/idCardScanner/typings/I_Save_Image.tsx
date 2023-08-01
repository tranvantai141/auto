export interface ISaveImage {
  transactionId: string;
  side: SIDE_TYPE;
}

export type SIDE_TYPE = 'FRONT' | 'BACK';
