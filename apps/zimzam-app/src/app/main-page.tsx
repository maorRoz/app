import { AssetsGrid } from './assets-grid';
import { useSelectedAssets } from './use-selected-assets';

export const MainPage = () => {
  const {
    selectedAssets,
    onAddAsset,
    onRemoveAsset,
    onToggleAssetFavorite,
    onToggleAssetSubscription,
  } = useSelectedAssets();

  return (
    <div className="bg-[#f2f4fc] h-screen">
      <div className="max-w-[1200px] m-auto h-full pt-12">
        <AssetsGrid
          selectedAssets={selectedAssets}
          onAddAsset={onAddAsset}
          onRemoveAsset={onRemoveAsset}
          onToggleAssetFavorite={onToggleAssetFavorite}
          onToggleAssetSubscription={onToggleAssetSubscription}
        />
      </div>
    </div>
  );
};
