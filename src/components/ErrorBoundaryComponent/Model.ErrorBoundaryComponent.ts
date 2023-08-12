import { GestureResponderEvent } from "react-native";

export interface IErrorScreenProps {
  error: Error;
  resetError: (event: GestureResponderEvent) => void;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
  ErrorScreen: React.ComponentType<IErrorScreenProps>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onError?: Function;
}

export type TErrorBoundaryState = { error: Error | null };