import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { containerAttributes } from '../../utils/container-attributes';
import clsx from 'clsx';
import GridViewIcon from '@mui/icons-material/GridViewOutlined';
import TableRowsIcon from '@mui/icons-material/TableRowsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { ViewMode } from '../../types/view-mode';
import { useState } from 'react';

export const FiltersBar = ({
  searchInput,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: {
  searchInput: string;
  onSearchChange: (searchInput: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <div
      className={clsx(
        containerAttributes,
        'px-4 py-2 flex justify-between items-center'
      )}
    >
      <div className="flex items-center flex-1">
        <IconButton
          sx={{ p: '10px' }}
          aria-label="search"
          color={isSearchFocused ? 'primary' : 'default'}
        >
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
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
      <div>
        <IconButton
          size="small"
          color={viewMode === ViewMode.ROWS ? 'primary' : 'default'}
          onClick={() => onViewModeChange(ViewMode.ROWS)}
        >
          <TableRowsIcon />
        </IconButton>
        <IconButton
          size="small"
          color={viewMode === ViewMode.GRID ? 'primary' : 'default'}
          onClick={() => onViewModeChange(ViewMode.GRID)}
        >
          <GridViewIcon />
        </IconButton>
      </div>
    </div>
  );
};
