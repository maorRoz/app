import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { containerAttributes } from '../../utils/container-attributes';
import clsx from 'clsx';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';

export const FiltersBar = ({
  searchInput,
  onSearchChange,
}: {
  searchInput: string;
  onSearchChange: (searchInput: string) => void;
}) => {
  return (
    <div
      className={clsx(
        containerAttributes,
        'p-4 flex justify-between items-center'
      )}
    >
      <div className="flex items-center flex-1">
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={searchInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onSearchChange(event.target.value);
          }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </div>
      <div>
        <IconButton size="small">
          <GridViewIcon />
        </IconButton>
        <IconButton size="small">
          <GridViewIcon />
        </IconButton>
      </div>
    </div>
  );
};
