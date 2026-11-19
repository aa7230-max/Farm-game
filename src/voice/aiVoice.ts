// 대사를 음성으로 읽어 주는 클라이언트.
// 프로토타입(dual-rpg)에서 가져온 구조. 차이점: API 키를 브라우저에 두지 않고
// 서버 프록시(/api/tts)를 호출합니다. 프록시가 없으면 브라우저 내장 음성을 씁니다.

export type VoiceName = 'Vindemiatrix' | 'Aoede' | 'Puck' | 'Charon';

export interface VoiceOptions {
  /** 서버 TTS 프록시 주소. 비어 있으면 브라우저 음성만 사용 */
  ttsEndpoint?: string;
  defaultVoice?: VoiceName;
}

export class AiVoice {
  private audio: HTMLAudioElement | null = null;
  private readonly endpoint: string;
  private readonly defaultVoice: VoiceName;

  constructor(opts: VoiceOptions = {}) {
    this.endpoint = opts.ttsEndpoint ?? '';
    this.defaultVoice = opts.defaultVoice ?? 'Aoede';
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  /** 음성 재생. 실패하면 브라우저 음성으로 대체합니다. */
  async speak(text: string, voice?: VoiceName): Promise<'server' | 'browser'> {
    this.stop();
    if (!this.endpoint) {
      this.speakBrowser(text);
      return 'browser';
    }
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: voice ?? this.defaultVoice }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      const blob = await res.blob();
      this.audio = new Audio(URL.createObjectURL(blob));
      await this.audio.play();
      return 'server';
    } catch {
      this.speakBrowser(text);
      return 'browser';
    }
  }

  private speakBrowser(text: string): void {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 1.05;
    window.speechSynthesis.speak(u);
  }
}
