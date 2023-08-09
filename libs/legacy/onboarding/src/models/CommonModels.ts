export interface IBaseInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRoute<T> {
  route: {
    params: T;
  };
}

export interface IRenderItemProps<T> {
  item: T;
  index: number;
}

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
