export interface Event {
    content: { [key: string]: any };
    date: string;
    nano: number;
    room: string;
    sender: string;
    senderName: string;
    senderType: 0;
    target: string;
    type: string;
  }
  