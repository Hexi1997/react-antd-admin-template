import { useBoolean, useMount } from 'react-use';
export function useMainnetStatus() {
  const [fetchingStatus, toggleFetchingStatus] = useBoolean(false);
  const [isNormal, toggleNormal] = useBoolean(true);
  useMount(() => {
    toggleFetchingStatus();
    fetch('https://matrixmarket.xyz')
      .then((v) => v.text())
      .then((v) => {
        if (
          v.includes('BE BACK SOON') &&
          v.includes('Please check back soon')
        ) {
          toggleNormal(true);
        } else {
          toggleNormal(false);
        }
      })
      .catch((e) => {
        console.error(e);
        toggleNormal();
      })
      .finally(toggleFetchingStatus);
  });

  return { fetchingStatus, isNormal };
}
