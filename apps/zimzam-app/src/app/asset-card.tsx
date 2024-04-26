import Button from '@mui/material/Button';
import clsx from 'clsx';
import { containerAttributes } from '../utils/container-attributes';

export const AssetCard = () => {
  return (
    <div className={clsx('p-4', containerAttributes)}>
      <h1 className="flex justify-between">
        <span>BTC</span>
        <span>$64,633.00</span>
      </h1>
      <Button>Subscribed</Button>
    </div>
  );
};
