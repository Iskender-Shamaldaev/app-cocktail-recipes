import React, { useState } from 'react';
import { Button, CardMedia, Menu, MenuItem } from '@mui/material';
import { User } from '../../../../type';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunk';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button component={NavLink} to="/artists/new" color="inherit">
        Add Artist
      </Button>
      <Button component={NavLink} to="/albums/new" color="inherit">
        Add Album
      </Button>
      <Button component={NavLink} to="/tracks/new" color="inherit">
        Add Track
      </Button>
      <Button component={NavLink} to="/trackHistories" color="warning">
        Track History
      </Button>

      <CardMedia>
        <img
          style={{ height: '50px', borderRadius: '50px', width: '50px' }}
          src={user.avatar}
          alt="User Avatar"
        />
      </CardMedia>

      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
