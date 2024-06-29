import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Home/Header';
import ProfileHeader from 'components/UserProfile/ProfileHeader';
import EditDialog from 'components/UserProfile/EditDialog';
import PasswordDialog from 'components/UserProfile/PasswordDialog';
import AvatarDialog from 'components/UserProfile/AvatarDialog';
import PhoneDialog from 'components/UserProfile/PhoneDialog';
import DeleteDialog from 'components/UserProfile/DeleteDialog';
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  fetchUser,
  updateUser,
  updatePassword,
  deleteUser,
} from 'store/userSlice';
import { setCredentials, logout } from 'store/Auth/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editField, setEditField] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('../assets/images/defaultprofile.png');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setAvatar(user.avatar);
      setPhone(user.phone);
    }
  }, [user]);

  const handleEditClick = (field) => {
    if (field === 'Password') {
      setOpenPasswordDialog(true);
    } else if (field === 'Phone') {
      setOpenPhoneDialog(true);
    } else {
      setEditField(field);
      setOpenEditDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setEditField('');
    setFirstName(user.first_name);
    setLastName(user.last_name);
  };

  const handlePasswordDialogClose = () => {
    setOpenPasswordDialog(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAvatarDialogClose = () => {
    setOpenAvatarDialog(false);
  };

  const handlePhoneDialogClose = () => {
    setOpenPhoneDialog(false);
    setPhone(user.phone);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSave = async () => {
    try {
      await dispatch(
        updateUser({ first_name: firstName, last_name: lastName })
      );
      toast.success(`${editField} updated successfully`);
      dispatch(
        setCredentials({ ...user, first_name: firstName, last_name: lastName })
      );
      handleDialogClose();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await dispatch(
          updatePassword({
            current_password: currentPassword,
            new_password: newPassword,
          })
        );
        toast.success('Password changed successfully');
        handlePasswordDialogClose();
      } catch (error) {
        toast.error('Failed to change password');
      }
    } else {
      toast.error('Passwords do not match');
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhone = async () => {
    try {
      await dispatch(updateUser({ phone }));
      toast.success('Phone number updated successfully');
      dispatch(setCredentials({ ...user, phone }));
      handlePhoneDialogClose();
    } catch (error) {
      toast.error('Failed to update phone number');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser());
      dispatch(logout());
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  return (
    <div>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <ProfileHeader
              avatar={avatar}
              user={user}
              onEditAvatar={() => setOpenAvatarDialog(true)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography>Name</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick('Name')}
                >
                  Edit
                </Button>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography>Tours / Properties</Typography>
                <Button variant="contained">Show</Button>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography>Phone</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick('Phone')}
                >
                  Edit
                </Button>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography>Password</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick('Password')}
                >
                  Edit
                </Button>
              </Box>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Manage Account
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Button
                color="error"
                variant="contained"
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <EditDialog
          isOpen={openEditDialog}
          onClose={handleDialogClose}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          onSave={handleSave}
        />
        <PasswordDialog
          isOpen={openPasswordDialog}
          onClose={handlePasswordDialogClose}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onSave={handleChangePassword}
        />
        <AvatarDialog
          isOpen={openAvatarDialog}
          onClose={handleAvatarDialogClose}
          onChange={handleAvatarChange}
        />
        <PhoneDialog
          isOpen={openPhoneDialog}
          onClose={handlePhoneDialogClose}
          phone={phone}
          setPhone={setPhone}
          onSave={handleSavePhone}
        />
        <DeleteDialog
          isOpen={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          onDelete={handleDeleteAccount}
        />
      </Container>
    </div>
  );
}

export default Profile;
