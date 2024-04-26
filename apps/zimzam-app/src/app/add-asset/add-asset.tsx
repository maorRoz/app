import { Button } from '@mui/material';
import { useState } from 'react';
import { AddAssetModal } from './add-asset-modal';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

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

  const { mutate: submitAsset } = useMutation({
    mutationFn: async () => {
      const upperCaseAsset = assetCodeInput.toUpperCase();

      const { data } = await axios.post('/api', { code: upperCaseAsset });

      return data.code;
    },
    onSuccess: (assetCode) => {
      onAddAsset(assetCode);
      handleClose();
    },
  });

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Asset
      </Button>
      <AddAssetModal
        open={open}
        onClose={handleClose}
        onClosed={handleClosed}
        onSubmit={submitAsset}
        assetCodeInput={assetCodeInput}
        onAssetCodeInputChange={setAssetCodeInput}
      />
    </>
  );
};
