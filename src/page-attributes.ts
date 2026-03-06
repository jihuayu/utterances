import repoRegex from './repo-regex';
import { DEFAULT_GITHUB_API_ENDPOINT } from './utterances-api';

function readEndpoint(value: string | undefined) {
  if (value === undefined) {
    return DEFAULT_GITHUB_API_ENDPOINT;
  }

  const endpoint = value.trim();
  if (endpoint === '') {
    throw new Error('"endpoint" cannot be blank.');
  }

  let parsed: URL;
  try {
    parsed = new URL(endpoint);
  } catch {
    throw new Error(`Invalid endpoint URL: "${value}"`);
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error('"endpoint" must be an absolute http(s) URL.');
  }

  parsed.search = '';
  parsed.hash = '';
  return parsed.toString().replace(/\/$/, '');
}

function readPageAttributes() {
  const params = Object.fromEntries(new URL(location.href).searchParams)

  let issueTerm: string | null = null;
  let issueNumber: number | null = null;
  if ('issue-term' in params) {
    issueTerm = params['issue-term'];
    if (issueTerm !== undefined) {
      if (issueTerm === '') {
        throw new Error('When issue-term is specified, it cannot be blank.');
      }
      if (['title', 'url', 'pathname', 'og:title'].indexOf(issueTerm) !== -1) {
        if (!params[issueTerm]) {
          throw new Error(`Unable to find "${issueTerm}" metadata.`);
        }
        issueTerm = params[issueTerm];
      }
    }
  } else if ('issue-number' in params) {
    issueNumber = +params['issue-number'];
    if (issueNumber.toString(10) !== params['issue-number']) {
      throw new Error(`issue-number is invalid. "${params['issue-number']}`);
    }
  } else {
    throw new Error('"issue-term" or "issue-number" must be specified.');
  }

  if (!('repo' in params)) {
    throw new Error('"repo" is required.');
  }

  if (!('origin' in params)) {
    throw new Error('"origin" is required.');
  }

  const matches = repoRegex.exec(params.repo);
  if (matches === null) {
    throw new Error(`Invalid repo: "${params.repo}"`);
  }

  return {
    owner: matches[1],
    repo: matches[2],
    endpoint: readEndpoint(params.endpoint),
    issueTerm,
    issueNumber,
    origin: params.origin,
    url: params.url,
    title: params.title,
    description: params.description,
    label: params.label,
    theme: params.theme || 'github-light',
    session: params.session
  };
}

export const pageAttributes = readPageAttributes();
