import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Header from 'components/Home/Header';
import ProfileHeader from 'components/UserProfile/ProfileHeader';
import EditDialog from 'components/UserProfile/EditDialog';
import PasswordDialog from 'components/UserProfile/PasswordDialog';
import AvatarDialog from 'components/UserProfile/AvatarDialog';
import PhoneDialog from 'components/UserProfile/PhoneDialog';
import DeleteDialog from 'components/UserProfile/DeleteDialog';
import ProfileDetails from 'components/UserProfile/ProfileDetails';
import {
  fetchUser,
  updateUser,
  updatePassword,
  updatePhone,
  updateAvatar,
  deleteUser,
} from 'store/userSlice';
import { setCredentials, logout } from 'store/Auth/authSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'First Name should be more than 2 characters')
    .matches(
      /^[A-Za-z]+$/,
      'First Name should contain only alphabetic characters'
    ),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(3, 'Last Name should be more than 2 characters')
    .matches(
      /^[A-Za-z]+$/,
      'Last Name should contain only alphabetic characters'
    ),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
  phone: Yup.string()
    .required('Phone Number is required')
    .matches(
      /^01[0125][0-9]{8}$/,
      'Phone Number must be a valid Egyptian phone number'
    ),
});

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone_number);
    }
  }, [user]);

  const handleEditClick = (field) => {
    setEditField(field);
    if (field === 'Password') {
      setOpenPasswordDialog(true);
    } else if (field === 'Phone') {
      setOpenPhoneDialog(true);
    } else {
      setOpenEditDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setOpenPasswordDialog(false);
    setOpenPhoneDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          await dispatch(updateAvatar({ avatar: e.target.result }));
          dispatch(setCredentials({ ...user, avatar: e.target.result }));
          toast.success('Avatar updated successfully');
          setOpenAvatarDialog(false);
        } catch (error) {
          toast.error('Failed to update avatar');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(user.id));
      dispatch(logout());
      toast.success('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const handleSave = async () => {
    let valid = true;

    const validate = async () => {
      if (editField === 'Name') {
        const schema = validationSchema.pick(['firstName', 'lastName']);
        try {
          await schema.validate({ firstName, lastName }, { abortEarly: false });
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      } else if (editField === 'Password') {
        const schema = validationSchema.pick([
          'newPassword',
          'confirmPassword',
        ]);
        try {
          await schema.validate(
            { newPassword, confirmPassword },
            { abortEarly: false }
          );
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      } else if (editField === 'Phone') {
        const schema = validationSchema.pick(['phone']);
        try {
          await schema.validate({ phone }, { abortEarly: false });
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      }
    };

    await validate();

    if (!valid) return;

    try {
      if (editField === 'Name') {
        await dispatch(
          updateUser({ first_name: firstName, last_name: lastName })
        );
        dispatch(
          setCredentials({
            ...user,
            first_name: firstName,
            last_name: lastName,
          })
        );
        toast.success('Profile updated successfully');
      } else if (editField === 'Password') {
        await dispatch(
          updatePassword({
            current_password: currentPassword,
            new_password: newPassword,
          })
        );
        toast.success('Password changed successfully');
      } else if (editField === 'Phone') {
        await dispatch(updatePhone({ phone_number: phone }));
        dispatch(setCredentials({ ...user, phone_number: phone }));
        toast.success('Phone number updated successfully');
      }
      handleDialogClose();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <ProfileHeader
              avatar={user?.avatar || '../assets/images/defaultprofile.png'}
              user={user}
              onEditAvatar={() => setOpenAvatarDialog(true)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ProfileDetails
              user={user}
              onEditClick={handleEditClick}
              onDeleteClick={() => setOpenDeleteDialog(true)}
            />
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
          errors={errors}
        />
        <PasswordDialog
          isOpen={openPasswordDialog}
          onClose={handleDialogClose}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onSave={handleSave}
          errors={errors}
        />
        <AvatarDialog
          isOpen={openAvatarDialog}
          onClose={handleDialogClose}
          onChange={handleAvatarChange}
        />
        <PhoneDialog
          isOpen={openPhoneDialog}
          onClose={handleDialogClose}
          phone={phone}
          setPhone={setPhone}
          onSave={handleSave}
          errors={errors}
        />
        <DeleteDialog
          isOpen={openDeleteDialog}
          onClose={handleDialogClose}
          onDelete={handleDeleteAccount}
        />
      </Container>
    </div>
  );
}

export default Profile;
