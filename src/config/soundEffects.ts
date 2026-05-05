const soundEffectModules = import.meta.glob<{ default: string }>(
  '../assets/sounds/ambiance-sfx/*.mp3',
  { eager: true },
);

export const SOUND_EFFECTS = Object.values(soundEffectModules).map(
  (module) => module.default,
);
