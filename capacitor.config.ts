import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fmasi.battItalia',
  appName: 'battItalia',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://pandoplex.duckdns.org',
    hostname: 'pandoplex.duckdns.org',
    androidScheme: 'http',
    allowNavigation: [],
  },
};

export default config;
