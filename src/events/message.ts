export interface Message {
  message: string;
  sender: string;
  receiver?: string;
  timestamp: number;
}
