import { getAuthorizeEndpoint, getTokenEndpoint } from './utterances-api';
import { pageAttributes } from './page-attributes';

export const token = { value: null as null | string };

// tslint:disable-next-line:variable-name
export function getLoginUrl(redirect_uri: string) {
  const authorizeEndpoint = getAuthorizeEndpoint(pageAttributes.endpoint);
  return `${authorizeEndpoint}?${new URLSearchParams({ redirect_uri })}`;
}

export async function loadToken(): Promise<string | null> {
  if (token.value) {
    return token.value;
  }
  if (!pageAttributes.session) {
    return null;
  }
  const response = await fetch(getTokenEndpoint(pageAttributes.endpoint), {
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
