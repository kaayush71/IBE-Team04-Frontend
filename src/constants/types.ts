export interface rooms {
  roomCountArray : [number];
  roomCountSelected: number;
}
export interface guestType {
  categoryName: string;
  ageRange: string;
  count: number;
  minCount: number;
}
export interface guest {
    guestTypes: guestType[];
}
export interface bed{
   bedCountSelected : number;
   bedCountArray : [number];
}
