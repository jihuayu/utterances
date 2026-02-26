import { UTTERANCES_OAUTH_API } from './utterances-api';
import { pageAttributes } from './page-attributes';

export const token = { value: null as null | string };
const TOKEN_ENDPOINT = 'https://xtalk.raw2.cc/api/utterances/token';

// tslint:disable-next-line:variable-name
export function getLoginUrl(redirect_uri: string) {
  return `${UTTERANCES_OAUTH_API}/authorize?${new URLSearchParams({ redirect_uri })}`;
}

export async function loadToken(): Promise<string | null> {
  if (token.value) {
    return token.value;
  }
  if (!pageAttributes.session) {
    return null;
  }
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(pageAttributes.session)
  });
  if (response.ok) {
    const t = await response.json();
    token.value = t;
    return t;
  }
  return null;
}
