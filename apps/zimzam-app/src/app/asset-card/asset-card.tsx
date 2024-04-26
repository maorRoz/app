import Button from '@mui/material/Button';
import clsx from 'clsx';
import { containerAttributes } from '../../utils/container-attributes';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteEmptyIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilledIcon from '@mui/icons-material/FavoriteOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import { AssetRow } from './asset-row';
import { ViewMode } from '../../types/view-mode';
import { AssetGridItem } from './asset-grid-item';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const AssetCard = ({
  viewMode,
  assetCode,
  latestPrice,
  priceRecords,
  isFavorite,
  onFavoriteChange,
  isSubscribed,
  onSubscribeChange,
  onClear,
}: {
  viewMode: ViewMode;
  assetCode: string;
  latestPrice: number;
  priceRecords: number[];
  isFavorite: boolean;
  onFavoriteChange: () => void;
  isSubscribed: boolean;
  onSubscribeChange: () => void;
  onClear: () => void;
}) => {
  const currentLatestPrice = latestPrice || priceRecords[0] || 0;

  const formattedLatestPrice = formatter.format(currentLatestPrice);

  return viewMode === ViewMode.ROWS ? (
    <AssetRow
      assetCode={assetCode}
      latestPrice={formattedLatestPrice}
      priceRecords={priceRecords}
      isFavorite={isFavorite}
      onFavoriteChange={onFavoriteChange}
      isSubscribed={isSubscribed}
      onSubscribeChange={onSubscribeChange}
      onClear={onClear}
    />
  ) : (
    <AssetGridItem
      assetCode={assetCode}
      latestPrice={formattedLatestPrice}
      priceRecords={priceRecords}
      isFavorite={isFavorite}
      onFavoriteChange={onFavoriteChange}
      isSubscribed={isSubscribed}
      onSubscribeChange={onSubscribeChange}
      onClear={onClear}
    />
  );
};
