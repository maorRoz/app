import { AddAsset } from '../add-asset';
import { AssetCard } from '../asset-card';
import { useState } from 'react';
import { FiltersBar } from '../filters-bar';
import { ViewMode } from '../../types/view-mode';

export const AssetsGrid = ({
  selectedAssets,
  onAssetSelect,
}: {
  selectedAssets: string[];
  onAssetSelect: (asset: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState(ViewMode.ROWS);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex justify-between">
        <span className="text-2xl font-bold text-zimzam-purple-400">
          Assets
        </span>
        <AddAsset onAddAsset={onAssetSelect} />
      </h1>
      <FiltersBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <div className="grid gap-4">
        <AssetCard assetCode="BTC" />
        <AssetCard assetCode="ETH" />
        <AssetCard assetCode="SOL" />
      </div>
      <AddAsset onAddAsset={onAssetSelect} />
    </div>
  );
};
