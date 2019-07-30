import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync('config/' + filePath));
    } catch (e) {
      this.envConfig = dotenv.parse(fs.readFileSync('config/development.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
