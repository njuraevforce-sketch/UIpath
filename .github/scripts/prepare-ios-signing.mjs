import { createPrivateKey, sign } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { ASC_KEY_ID, ASC_ISSUER_ID, RUNNER_TEMP, APP_BUNDLE_ID } = process.env;
if (!ASC_KEY_ID || !ASC_ISSUER_ID || !RUNNER_TEMP || !/^[A-Za-z0-9.-]+$/.test(APP_BUNDLE_ID || '')) {
  throw new Error('Valid App Store Connect signing configuration is required.');
}
const key = createPrivateKey(readFileSync(join(RUNNER_TEMP, 'AuthKey.p8')));
const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const unsigned = `${encode({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' })}.${encode({ iss: ASC_ISSUER_ID, iat: now, exp: now + 300, aud: 'appstoreconnect-v1' })}`;
const token = `${unsigned}.${sign('sha256', Buffer.from(unsigned), { key, dsaEncoding: 'ieee-p1363' }).toString('base64url')}`;
async function apple(path) {
  const response = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Apple signing resource request failed (HTTP ${response.status}).`);
  return response.json();
}
const bundles = await apple(`/v1/bundleIds?filter%5Bidentifier%5D=${encodeURIComponent(APP_BUNDLE_ID)}`);
const bundle = bundles.data?.find(item => item.attributes?.identifier === APP_BUNDLE_ID);
if (!bundle) throw new Error(`Register ${APP_BUNDLE_ID} as its own explicit App ID first. Do not reuse the PIXEL Bundle ID.`);
const profiles = await apple(`/v1/bundleIds/${encodeURIComponent(bundle.id)}/profiles?limit=200`);
const profile = profiles.data?.find(item => item.attributes?.profileType === 'IOS_APP_STORE' && item.attributes?.profileState === 'ACTIVE' && Date.parse(item.attributes?.expirationDate ?? '') > Date.now() && item.attributes?.profileContent);
if (!profile) throw new Error(`Create an active App Store distribution profile for ${APP_BUNDLE_ID} with the configured Apple Distribution certificate.`);
writeFileSync(join(RUNNER_TEMP, 'Diary.mobileprovision'), Buffer.from(profile.attributes.profileContent, 'base64'), { mode: 0o600 });
