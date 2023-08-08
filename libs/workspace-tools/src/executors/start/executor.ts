import { ExecutorContext } from '@nrwl/devkit';
import { fork } from 'child_process';
import * as path from 'path';

interface StartAndRunIOSSchema {
  // Add any additional options if required
}

export default async function runExecutor(
  options: StartAndRunIOSSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  return new Promise((resolve, reject) => {
    try {
      const appDirectory = path.join(context.root, 'apps', context.projectName);

      console.log('Starting the React Native app...');
      const metroBundler = fork(
        require.resolve('react-native/cli.js'),
        ['start'],
        {
          stdio: 'inherit',
          cwd: appDirectory,
        }
      );

      metroBundler.on('message', (message) => {
        // Check for a specific message from the bundler to know when it's ready
        if (message && message.type === 'READY') {
          console.log('Running iOS SIT simulator...');
          const runIOS = fork(
            require.resolve('react-native/cli.js'),
            [
              'run-ios',
              '--scheme',
              'Simulator-SIT',
              '--simulator',
              "'iPad (9th generation)'",
              '--no-packager',
            ],
            {
              stdio: 'inherit',
              cwd: appDirectory,
              env: { ...process.env, ENVFILE: '.env.sit' },
            }
          );

          runIOS.on('exit', (code) => {
            if (code === 0) {
              resolve({ success: true });
            } else {
              reject({ success: false });
            }
          });
        }
      });

      metroBundler.on('exit', (code) => {
        if (code !== 0) {
          reject({ success: false });
        }
      });
    } catch (error) {
      console.error('Failed to run the commands:', error);
      reject({ success: false });
    }
  });
}
