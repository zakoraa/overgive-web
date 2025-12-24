export interface PinataFileRow {
  id: string;
  cid: string;
  size: number;
  createdAt: string;
}

export interface PinataListResponse {
  rows: PinataFileRow[];
}
