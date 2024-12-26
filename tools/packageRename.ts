import { readdirSync, renameSync } from 'fs';
import * as path from 'path';
import PkgType from '../package.json';

const BROWSER = process.env.BROWSER;
if (!BROWSER) {
  throw new Error('BROWSER env is not defined!');
}
const artifactsDir = 'web-ext-artifacts';

try {
  const version = PkgType.version;

  if (!version) {
    throw new Error('Version not found in package.json.');
  }

  const expectedFileName = `docfiller-${version}.zip`;

  const files = readdirSync(artifactsDir);
  if (!files.includes(expectedFileName)) {
    throw new Error(`File ${expectedFileName} not found in ${artifactsDir}.`);
  }

  const outputFile = expectedFileName;
  const newFileName = `docfiller-${version}-${BROWSER}.zip`;
  const oldFilePath = path.join(artifactsDir, outputFile);
  const newFilePath = path.join(artifactsDir, newFileName);

  renameSync(oldFilePath, newFilePath);
  console.log(`Renamed ${oldFilePath} to ${newFilePath}`);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}