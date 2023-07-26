import { useFormik } from 'formik';
import { useState } from 'react';
import {
  WrapFileOk,
  StyledLabel,
  StyledBtn,
  Wrap,
  WrapFoto,
  Avatar,
  WrapInfo,
  InfoItem,
  TextTitle,
  Text,
  StyledBtnSave,
  StyledBtnEdit,
  ErrorMessage,
} from './UserForm.styled';
import photoDefault from '../../images/userPageImages/photoDefault.svg';
import IconCamera from 'images/icons/IconCamera';
import { validationSchema } from './ValidationSchema';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';

export const UserForm = ({ close }) => {
	const { user, error } = useAuth();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isAvatar, setIsAvatar] = useState(user.avatar || photoDefault);
  const [isAvatarOld, setIsAvatarOld] = useState(user.avatar || photoDefault);
	const [isFile, setIsFile] = useState(false);

  const isOpenModal = () => {
    setIsModal(true);
  };
  const isCloseModal = () => {
    setIsModal(false);
  };
  const isEditUser = () => {
    setIsEdit(true);
  };
  const isFaleEdit = () => {
    setIsFile(false);
    setIsAvatar(isAvatarOld);
  };
  const isFaleOkEdit = () => {
    setIsFile(false);
    setIsAvatarOld(isAvatar);
  };

  const isChangeFile = e => {
    const { files } = e.currentTarget;
    const avatarUrl = URL.createObjectURL(files[0]);
    setIsAvatar(avatarUrl);
    if (isAvatarOld !== avatarUrl) {
      setIsFile(true);
    }
  };
  const isChangeInput = e => {
    const { name, value } = e.target;
    setFieldValue(name, value);
	};

  const { setFieldValue, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        avatar: isAvatar,
        name: user.name,
        email: user.email,
        birthday: user.birthday || '',
        phone: user.phone || '',
        city: user.city || '',
      },
      validationSchema: validationSchema,
      onSubmit: async values => {
        //  setFieldValue('avatar', isAvatar);
        // console.log(avatar, city, phone);
        // alert(JSON.stringify(values, null, 2));
			setIsFile(false);
			const res = await dispatch(updateUserInfo(values));
			if (res.error) {
				return setIsEdit(true);
			} setIsEdit(false);
      },
    });

  return (
    <Wrap>
      <StyledBtnEdit
        icon={'IconEdit'}
        transparent={true}
        onClick={isEditUser}
        isEdit={isEdit}
      />
      <WrapFoto>
        <Avatar key="avatar" src={isAvatar} alt="avatar" />
        <StyledLabel htmlFor="avatar" isEdit={isEdit} isFile={isFile}>
          <IconCamera />
          {isFile ? 'Confirm' : 'Edit photo'}
        </StyledLabel>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={isChangeFile}
          style={{ display: 'none' }}
        />
        {isFile && (
          <WrapFileOk>
            <StyledBtn
              icon={'IconCheck'}
              transparent={true}
              onClick={isFaleOkEdit}
            />
            <p>Confirm</p>
            <StyledBtn
              icon={'IconCross'}
              transparent={true}
              onClick={isFaleEdit}
            />
          </WrapFileOk>
        )}
      </WrapFoto>
      <WrapInfo onSubmit={handleSubmit}>
        <InfoItem>
          <TextTitle htmlFor="name">Name:</TextTitle>
          <Text
            disabled={!isEdit ? true : false}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={isChangeInput}
            value={values.name}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <ErrorMessage>{errors.name}</ErrorMessage>
          ) : null}
        </InfoItem>
        <InfoItem>
          <TextTitle htmlFor="email">Email:</TextTitle>
          <Text
            disabled={!isEdit ? true : false}
            id="email"
            name="email"
            type="email"
            onChange={isChangeInput}
            value={values.email}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <ErrorMessage>{errors.email}</ErrorMessage>
          ) : null}
          {error && <ErrorMessage>Email is not unique</ErrorMessage>}
        </InfoItem>
        <InfoItem>
          <TextTitle htmlFor="birthday">Birthday:</TextTitle>
          <Text
            disabled={!isEdit ? true : false}
            id="birthday"
            name="birthday"
            type={!isEdit ? 'text' : 'date'}
            onChange={isChangeInput}
            value={values.birthday}
            onBlur={handleBlur}
          />
          {errors.birthday && touched.birthday ? (
            <ErrorMessage>{errors.birthday}</ErrorMessage>
          ) : null}
        </InfoItem>
        <InfoItem>
          <TextTitle htmlFor="phone">Phone:</TextTitle>
          <Text
            disabled={!isEdit ? true : false}
            id="phone"
            name="phone"
            type="phone"
            placeholder="+380000000000"
            onChange={isChangeInput}
            value={values.phone}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone ? (
            <ErrorMessage>{errors.phone}</ErrorMessage>
          ) : null}
        </InfoItem>
        <InfoItem>
          <TextTitle htmlFor="city">City:</TextTitle>
          <Text
            disabled={!isEdit ? true : false}
            id="city"
            name="city"
            type="text"
            placeholder="Kyev"
            onChange={isChangeInput}
            value={values.city}
            onBlur={handleBlur}
          />
          {errors.city && touched.city ? (
            <ErrorMessage>{errors.city}</ErrorMessage>
          ) : null}
        </InfoItem>
        {isEdit && (
          <StyledBtnSave type="submit" text="Save" onClick={handleSubmit} />
        )}
      </WrapInfo>
      {!isEdit && (
        <StyledBtn
          icon={'Iconlogout'}
          text={'Log Out'}
          transparent={true}
          onClick={isOpenModal}
        />
      )}
      {isModal && <ModalApproveAction close={isCloseModal} id={user.id} />}
    </Wrap>
  );
};
