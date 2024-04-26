export const getStoredAssets = () => {
  const assetsString = localStorage.getItem('assets');

  return assetsString ? assetsString.split(',') : [];
};

export const storeAssets = (assets: string[] = []) => {
  localStorage.setItem('assets', assets.join(','));
};
