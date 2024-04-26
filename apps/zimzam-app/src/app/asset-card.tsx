import Button from '@mui/material/Button';
import clsx from 'clsx';
import { containerAttributes } from '../utils/container-attributes';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteEmptyIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilledIcon from '@mui/icons-material/FavoriteOutlined';

export const AssetCard = ({
  assetCode,
  latestPrice,
  priceRecords,
  isFavorite,
  isSubscribed,
  onClear,
  onFavoriteChange,
  onSubscribeChange,
}) => {
  return (
    <div className={clsx('p-4', containerAttributes)}>
      <h1 className="flex justify-between">
        <div className="w-8 h-8">
          <img
            src={`/src/assets/svgs/${assetCode.toLowerCase()}.svg`}
            alt={assetCode}
          />
        </div>
        <span>$64,633.00</span>
      </h1>
      <Button color="secondary">Subscribed</Button>
      {isFavorite ? (
        <IconButton size="small">
          <FavoriteFilledIcon />
        </IconButton>
      ) : (
        <IconButton size="small">
          <FavoriteEmptyIcon />
        </IconButton>
      )}
      <IconButton size="small">
        <ClearIcon />
      </IconButton>
    </div>
  );
};
