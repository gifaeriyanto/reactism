import axios from 'axios';
import { GithubContentAPIResponse } from './get-template-list';
import { DownloaderHelper } from 'node-downloader-helper';
import { mkdirSync, rename } from 'fs';
import { cli } from 'cli-ux';

export const downloadTemplate = async (
  destFolder: string,
  template: string,
  subFolder?: string,
) => {
  const { data } = await axios.get<GithubContentAPIResponse[]>(
    'https://api.github.com/repos/gifaeriyanto/reactism-templates/contents/templates/' +
      template,
  );

  await Promise.all(
    data.map(async (item) => {
      if (item.type === 'dir') {
        mkdirSync(destFolder + '/' + item.name);
        await downloadTemplate(
          destFolder,
          template + '/' + item.name,
          item.name,
        );
      } else {
        const dl = new DownloaderHelper(
          item.download_url,
          subFolder ? destFolder + '/' + subFolder : destFolder,
        );
        dl.on('end', (stats) => {
          if (item.name !== stats.fileName) {
            rename(
              destFolder + '/' + stats.fileName,
              destFolder + '/' + item.name,
              (err) => {
                if (err) {
                  cli.error(err.message, {
                    exit: false,
                  });
                }
              },
            );
          }
        });
        await dl.start();
      }
    }),
  );
};
