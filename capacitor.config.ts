import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sakeMusik',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext:true
  }
};

export default config;
