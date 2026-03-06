export const DEFAULT_GITHUB_API_ENDPOINT = 'https://xtalk.raw2.cc';
const LEGACY_OAUTH_AUTHORIZE_ENDPOINT = 'https://api.utteranc.es/authorize';

function normalizeEndpoint(endpoint: string) {
  return endpoint.trim().replace(/\/+$/, '');
}

export function resolveGithubApiEndpoint(endpoint?: string) {
  if (!endpoint || endpoint.trim() === '') {
    return DEFAULT_GITHUB_API_ENDPOINT;
  }
  return normalizeEndpoint(endpoint);
}

export function getTokenEndpoint(githubApiEndpoint: string) {
  return `${resolveGithubApiEndpoint(githubApiEndpoint)}/api/utterances/token`;
}

export function getAuthorizeEndpoint(githubApiEndpoint: string) {
  const endpoint = resolveGithubApiEndpoint(githubApiEndpoint);
  if (endpoint === DEFAULT_GITHUB_API_ENDPOINT) {
    // Keep legacy behavior for the default hosted service.
    return LEGACY_OAUTH_AUTHORIZE_ENDPOINT;
  }
  return `${endpoint}/api/utterances/authorize`;
}
