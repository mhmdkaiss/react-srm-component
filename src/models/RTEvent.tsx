export interface Event {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
