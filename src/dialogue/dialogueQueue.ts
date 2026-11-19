// NPC 대사를 한 줄씩 넘기는 큐. 프로토타입의 dialogueQueue 로직을 옮긴 것입니다.

export interface Dialogue {
  speaker: string;
  lines: string[];
  voice?: string;
}

export class DialogueQueue {
  private lines: string[] = [];
  speaker = '';
  voice: string | undefined;

  open(d: Dialogue): void {
    this.speaker = d.speaker;
    this.voice = d.voice;
    this.lines = [...d.lines];
  }

  /** 다음 대사를 꺼냅니다. 더 없으면 null. */
  next(): string | null {
    return this.lines.shift() ?? null;
  }

  get isOpen(): boolean {
    return this.lines.length > 0;
  }
}
