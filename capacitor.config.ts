import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.escapebox.app',
  appName: 'Escape Box',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
};

export default config;
