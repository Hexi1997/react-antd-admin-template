import moment from 'moment';

const UTC_8_MI_SECONDS = 8 * 60 * 60 * 1000;
export function formatTime(value: unknown) {
  return moment((value as number) * 1000 + UTC_8_MI_SECONDS).format(
    'YYYY-MM-DD hh:mm:ss'
  );
}

export function waitTime(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, seconds * 1000);
  });
}

export const SYSTEM_ROYALTY_ACCOUNT = '0x120607265b6f416a';

export function getPastDays() {
  return moment(Date.now()).diff(moment('2022-07-26'), 'day');
}

export const CLOUDFLARE_WORKERS_BASE_URI =
  'https://flowmarket-admin.whitematrix.workers.dev';

export const isLocalHost = window.location.href.includes('localhost');
