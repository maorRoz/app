import Button from '@mui/material/Button';
import clsx from 'clsx';
import { containerAttributes } from '../../utils/container-attributes';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteEmptyIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilledIcon from '@mui/icons-material/FavoriteOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import CheckIcon from '@mui/icons-material/CheckOutlined';

export const AssetGridItem = ({
  assetCode,
  latestPrice,
  priceRecords,
  isFavorite,
  onFavoriteChange,
  isSubscribed,
  onSubscribeChange,
  onClear,
}: {
  assetCode: string;
  latestPrice: string;
  priceRecords: number[];
  isFavorite: boolean;
  onFavoriteChange: () => void;
  isSubscribed: boolean;
  onSubscribeChange: () => void;
  onClear: () => void;
}) => {
  return (
    <div className={clsx('flex flex-col gap-10 p-4', containerAttributes)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img
              src={`/src/assets/svgs/${assetCode.toLowerCase()}.svg`}
              alt={assetCode}
            />
          </div>
          <div className="text-gray-500">{assetCode}</div>
        </div>
        <div className="font-bold">{latestPrice}</div>
      </div>
      <SparkLineChart plotType="line" data={priceRecords} height={40} />
      <div className="flex gap-2 items-center">
        <Button
          sx={{ width: 151 }}
          color={isSubscribed ? 'secondary' : 'success'}
          variant="contained"
          onClick={onSubscribeChange}
          startIcon={isSubscribed && <CheckIcon />}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
        <IconButton size="small" onClick={onFavoriteChange} color="error">
          {isFavorite ? <FavoriteFilledIcon /> : <FavoriteEmptyIcon />}
        </IconButton>
        <IconButton size="small" onClick={onClear}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};
