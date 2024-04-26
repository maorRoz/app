import TextField from '@mui/material/TextField';
import { AddAsset } from '../add-asset';
import { AssetCard } from '../asset-card';
import { useSelectedAssets } from '../use-selected-assets';
import { useState } from 'react';
import { FiltersBar } from '../filters-bar';

export const AssetsGrid = () => {
  const { selectedAssets, onAssetSelect } = useSelectedAssets();
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex justify-between">
        <span className="text-2xl font-bold">Assets</span>
        <AddAsset onAddAsset={onAssetSelect} />
      </h1>
      <FiltersBar searchInput={searchInput} onSearchChange={setSearchInput} />
      <div className="grid gap-4">
        <AssetCard />
        <AssetCard />
        <AssetCard />
      </div>
      <AddAsset onAddAsset={onAssetSelect} />
    </div>
  );
};
