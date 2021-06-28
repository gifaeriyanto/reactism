import axios from 'axios';

export interface Choice {
  name: string;
  value: string;
}

export interface GithubContentAPIResponse {
  name: string;
  path: string;
  sha: string;
  size: 1200;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export const getTemplateList = async () => {
  const { data } = await axios.get<GithubContentAPIResponse[]>(
    'https://api.github.com/repos/gifaeriyanto/reactism-templates/contents/templates',
  );

  return data
    .filter(({ type }) => type === 'dir')
    .map(({ name }) => ({ name, value: name } as Choice));
};
