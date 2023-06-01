export enum EMessageTypes {
  failed = "failed",
  success = "success",
  warning = "warning",
  back = "back",
}

export interface IMessageProps {
  type: EMessageTypes;
  message: string;
  duration: number;
}
export type TShowGlobalMessage = (message: string, type?: EMessageTypes, duration?: number) => void;

export enum EObject {
  icon = "icon",
  backgroundColor = "backgroundColor",
  top = "top",
  minWidth = "minWidth",
}

export interface IObject {
  [EObject.icon]: JSX.Element | null;
  [EObject.backgroundColor]: string;
  [EObject.top]: number | string;
  [EObject.minWidth]: number;
}

export interface IExtendedMessageProps extends IMessageProps {
  randomId: string;
}
