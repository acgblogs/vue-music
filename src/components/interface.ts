export interface Song {
  id: number;
  name: string;
  [propName: string]: any;
}

export interface Result {
  code: number;
  result: {
    hasMore: boolean;
    songCount: number;
    songs?: Song[];
    artists?: Song[];
  },
  msg?: string;
}

export interface TabData {
  index: number;
  paneName: string;
}