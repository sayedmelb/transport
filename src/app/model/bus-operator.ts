import { Bus } from "./bus";

export interface BusOperator {
  id?: string;
  organisation?: string;
  date?: string;
  busData?: Bus[];
}
