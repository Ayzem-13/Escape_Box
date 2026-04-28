const VOLUME_STORAGE_KEY = 'escapeBoxVolume';

class VolumeManager {
  private currentVolume: number = 100;
  private listeners: ((volume: number) => void)[] = [];
  private audioInstances: Set<HTMLAudioElement> = new Set();

  constructor() {
    // Load saved volume from localStorage
    const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
    this.currentVolume = saved ? parseFloat(saved) : 100;
    this.initializeAudioInterception();
    this.applyVolumeToAllAudio();
  }

  getVolume(): number {
    return this.currentVolume;
  }

  setVolume(volume: number): void {
    this.currentVolume = Math.max(0, Math.min(100, volume));
    localStorage.setItem(VOLUME_STORAGE_KEY, String(this.currentVolume));
    this.applyVolumeToAllAudio();
    this.notifyListeners();
  }

  private initializeAudioInterception(): void {
    // Intercept Audio constructor to track dynamically created audio elements
    const OriginalAudio = window.Audio;
    const manager = this;

    window.Audio = class extends OriginalAudio {
      constructor(...args: any[]) {
        super(...args);
        // Apply current volume to newly created Audio instances
        this.volume = manager.currentVolume / 100;
        manager.audioInstances.add(this);
      }
    } as any;

    // Copy static methods if needed
    Object.setPrototypeOf(window.Audio, OriginalAudio);
  }

  applyVolumeToAllAudio(): void {
    const volumeValue = this.currentVolume / 100;
    
    // Apply to all <audio> elements in the DOM
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.volume = volumeValue;
    });

    // Apply to tracked Audio instances
    this.audioInstances.forEach((audio) => {
      audio.volume = volumeValue;
    });
  }

  subscribe(callback: (volume: number) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentVolume));
  }
}

// Create global instance
const volumeManager = new VolumeManager();

// Make it globally accessible
declare global {
  interface Window {
    volumeManager?: VolumeManager;
  }
}

window.volumeManager = volumeManager;

export default volumeManager;
