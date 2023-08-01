export interface IInfoForm {
  phone: string;
  email: string;
  refCode: any;
}

export interface IUserInfo {
  item: user_item;
}

export type user_item = {
  id: number;
  name: string;
  isSelected: boolean | undefined;
};

export interface IPurposeInfo {
  id: number;
  name: string;
  selected: boolean;
}

export type seletion_type = 'yes' | 'no' | undefined;

export interface ISelectionType {
  type: seletion_type;
}

