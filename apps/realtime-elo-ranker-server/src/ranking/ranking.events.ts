export class PlayerUpdatedEvent {
    constructor(
        public readonly type: string,
        public readonly player: {
            id: string;
            rank: number;
        },
    ) { }
}
