declare type Dictionary<T> = {
  [key in string | number]: T;
};

declare type Nullable<T> = T | null;
