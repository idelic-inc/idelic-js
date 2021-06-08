import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.ts$',
  moduleDirectories: ['<rootDir>', 'node_modules'],
  testEnvironment: 'jsdom'
};
export default config;
