import { AddAsset } from '../add-asset';
import { AssetCard } from '../asset-card/asset-card';
import { useState } from 'react';
import { FiltersBar } from '../filters-bar';
import { ViewMode } from '../../types/view-mode';
import { Asset } from '../../types/asset';
import clsx from 'clsx';
import { SortMode } from '../../types/sort-mode';

const sortModeToSortFunction: Record<
  SortMode,
  (a1: Asset, a2: Asset) => number
> = {
  [SortMode.FAVORITE_FIRST]: (a1) => (a1.isFavorite ? -1 : 1),
  [SortMode.NAME_ASCENDING]: (a1, a2) => a1.code.localeCompare(a2.code),
  [SortMode.NAME_DESCENDING]: (a1, a2) => a2.code.localeCompare(a1.code),
};

export const AssetsGrid = ({
  selectedAssets,
  onAddAsset,
  onRemoveAsset,
  onToggleAssetFavorite,
  onToggleAssetSubscription,
}: {
  selectedAssets: Asset[];
  onAddAsset: (asset: string) => void;
  onRemoveAsset: (asset: string) => void;
  onToggleAssetFavorite: (asset: string) => void;
  onToggleAssetSubscription: (asset: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState(ViewMode.ROWS);
  const [sortMode, setSortMode] = useState(SortMode.NAME_ASCENDING);

  const filteredSelectedAssets = selectedAssets
    .filter(
      (selectedAsset) =>
        selectedAsset.code.search(searchInput.toUpperCase()) >= 0
    )
    .sort(sortModeToSortFunction[sortMode]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex justify-between">
        <span className="text-2xl font-bold text-zimzam-purple-400">
          Assets
        </span>
        <AddAsset onAddAsset={onAddAsset} />
      </h1>
      <FiltersBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortMode={sortMode}
        onSortModeChange={setSortMode}
      />
      <div
        className={clsx(
          'grid gap-4',
          viewMode === ViewMode.GRID ? 'grid-cols-3' : ''
        )}
      >
        {filteredSelectedAssets.map((selectedAsset) => (
          <AssetCard
            key={selectedAsset.code}
            viewMode={viewMode}
            assetCode={selectedAsset.code}
            latestPrice={selectedAsset.latestPrice}
            priceRecords={selectedAsset.priceRecords}
            isFavorite={selectedAsset.isFavorite}
            onFavoriteChange={() => onToggleAssetFavorite(selectedAsset.code)}
            isSubscribed={selectedAsset.isSubscribed}
            onSubscribeChange={() =>
              onToggleAssetSubscription(selectedAsset.code)
            }
            onClear={() => onRemoveAsset(selectedAsset.code)}
          />
        ))}
      </div>
    </div>
  );
};
