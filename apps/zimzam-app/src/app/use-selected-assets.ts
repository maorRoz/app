import { useState } from 'react';
import { getStoredAssets, storeAssets } from './stored-assets-actions';

export const useSelectedAssets = () => {
  const [selectedAssets, setSelectedAssets] = useState(getStoredAssets());

  const handleUpdateSelectedAssets = (updatedSelectedAssets: string[]) => {
    setSelectedAssets(updatedSelectedAssets);
    storeAssets(updatedSelectedAssets);
  };

  const handleAssetSelect = (asset: string) => {
    const upperCaseAsset = asset.toUpperCase();
    const isAssetAlreadySelected = selectedAssets.includes(upperCaseAsset);

    if (!isAssetAlreadySelected) {
      handleUpdateSelectedAssets([upperCaseAsset, ...selectedAssets]);
    }
  };

  const handleSelectedAssetRemove = (asset: string) =>
    handleUpdateSelectedAssets(
      selectedAssets.filter((selectedAsset) => selectedAsset !== asset)
    );

  return {
    selectedAssets,
    onAssetSelect: handleAssetSelect,
    onSelectedAssetRemove: handleSelectedAssetRemove,
  };
};
