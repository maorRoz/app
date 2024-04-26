import { Button } from '@mui/material';
import { useState } from 'react';
import { AddAssetModal } from './add-asset-modal';

export const AddAsset = ({
  onAddAsset,
}: {
  onAddAsset: (asset: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [assetCodeInput, setAssetCodeInput] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClosed = () => setAssetCodeInput('');

  const handleSubmit = () => {
    onAddAsset(assetCodeInput);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Asset
      </Button>
      <AddAssetModal
        open={open}
        onClose={handleClose}
        onClosed={handleClosed}
        onSubmit={handleSubmit}
        assetCodeInput={assetCodeInput}
        onAssetCodeInputChange={setAssetCodeInput}
      />
    </>
  );
};
