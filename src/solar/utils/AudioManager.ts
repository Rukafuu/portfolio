export class AudioManager {
  private audio: HTMLAudioElement;
  private isMuted: boolean = false;
  private volume: number = 0.5;

  constructor(filePath: string) {
    this.audio = new Audio(filePath);
    this.audio.loop = true;
    this.audio.volume = this.volume;
  }

  public play() {
    this.audio.play().catch(e => console.log("Audio play deferred until user interaction"));
  }

  public pause() {
    this.audio.pause();
  }

  public toggle() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    this.audio.volume = this.volume;
  }

  public getVolume() {
    return this.volume;
  }

  public isPaused() {
    return this.audio.paused;
  }
}
