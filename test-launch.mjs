import { launchIDE } from './node_modules/launch-ide/dist/index.mjs';

launchIDE({
  file: '/Users/answerose/Documents/Projects/GuiZhihao/src/main.ts',
  line: 1,
  column: 1,
  editor: 'trae',
  type: 'exec',
  onError: (file, err) => {
    console.log('ERROR:', err);
    process.exit(1);
  }
});
console.log('SUCCESS: launchIDE completed');