import { useState } from 'react';
import { getStoredAssets, storeAssets } from './stored-assets-actions';

export const useStoredAssets = () => {
  const [storedAssets, setStoredAssets] = useState(getStoredAssets());

  const handleUpdateStoredAssets = (updatedSelectedAssets: string[]) => {
    setStoredAssets(updatedSelectedAssets);
    storeAssets(updatedSelectedAssets);
  };

  const handleStoreAsset = (asset: string) => {
    const upperCaseAsset = asset.toUpperCase();
    const isAssetAlreadyStored = storedAssets.includes(upperCaseAsset);

    if (!isAssetAlreadyStored) {
      handleUpdateStoredAssets([upperCaseAsset, ...storedAssets]);
    }
  };

  const handleStoredAssetRemove = (asset: string) =>
    handleUpdateStoredAssets(
      storedAssets.filter((selectedAsset) => selectedAsset !== asset)
    );

  return {
    storedAssets,
    onStoreAsset: handleStoreAsset,
    onStoredAssetRemove: handleStoredAssetRemove,
  };
};
