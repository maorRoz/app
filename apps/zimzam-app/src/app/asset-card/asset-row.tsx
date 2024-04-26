import Button from '@mui/material/Button';
import clsx from 'clsx';
import { containerAttributes } from '../../utils/container-attributes';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteEmptyIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilledIcon from '@mui/icons-material/FavoriteOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import CheckIcon from '@mui/icons-material/CheckOutlined';

export const AssetRow = ({
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
}) => (
  <div
    className={clsx(
      'p-4 flex items-center justify-between',
      containerAttributes
    )}
  >
    <div className="flex items-center gap-2 w-[100px]">
      <div className="w-8 h-8">
        <img
          src={`/svgs/${assetCode.toLowerCase()}.svg`}
          alt={assetCode}
        />
      </div>
      <div className="text-gray-500">{assetCode}</div>
    </div>
    <div className="font-bold">{latestPrice}</div>
    <div>
      <SparkLineChart
        plotType="line"
        data={priceRecords}
        height={40}
        width={200}
      />
    </div>

    <div className="flex gap-2 justify-between items-center">
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
