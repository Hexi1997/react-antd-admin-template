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
