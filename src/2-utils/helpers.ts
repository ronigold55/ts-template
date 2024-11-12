import { appendFile } from 'fs';
import config from './config';

export const logIt = (message: string) => {
  appendFile(config.accessLog, `${message}\n`, (err) => {
    if (err) console.error('Error writing to log:', err);
  });
};

