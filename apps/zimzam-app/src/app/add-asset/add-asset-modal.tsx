import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export const AddAssetModal = ({
  open = false,
  onClose,
  onClosed: onExited,
  onSubmit,
  assetCodeInput,
  onAssetCodeInputChange,
}: {
  open?: boolean;
  onClose: () => void;
  onClosed: () => void;
  onSubmit: () => void;
  assetCodeInput: string;
  onAssetCodeInputChange: (assetCodeInput: string) => void;
}) => (
  <Dialog open={open} onClose={onClose} TransitionProps={{ onExited }}>
    <DialogTitle>Add Asset</DialogTitle>
    <DialogContent>
      <TextField
        value={assetCodeInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onAssetCodeInputChange(event.target.value);
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);
