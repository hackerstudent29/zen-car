"use client";

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  public toggle(): boolean {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.oscillators.length === 0) {
      // Harmonic Zen chord: 55Hz (A1), 110Hz (A2), 164.8Hz (E3), 220Hz (A3)
      const frequencies = [55, 110, 164.81, 220];
      this.oscillators = frequencies.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        oscGain.gain.setValueAtTime(0.08 / (i + 1), this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);
        osc.start();
        return osc;
      });
    }

    // Soft fade in (Apple-style gradual acoustic bloom)
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 1.2);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    this.isPlaying = false;
  }

  public get active(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = typeof window !== "undefined" ? new ZenAudioEngine() : null;
