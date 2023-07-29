import React, { useState } from 'react';
import { validationSchemaThirdAddSell } from '../addPetValidation';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import Plus from '../../../images/icons/IconPlusAddPhoto';
import MaleIcon from '../../../images/icons/IconMale';
import FemaleIcon from '../../../images/icons/IconFemale';
import ButtonRoutes from '../Buttons/ButtonRoutes';
import { ButtonNext, ButtonPrev } from '../Buttons/Buttons';
import {
  Title,
  LabelAddPhoto,
  LabelPhoto,
  PreviewPhoto,
  InputComments,
  PointBlock,
  WrapForm,
  SexPhotoBlock,
  SexContainer,
  LabelSex,
  ErrorSex,
  PhotoContainerSell,
  ErrorTextLowSell,
  InputContainer,
  Label,
  Input,
  ErrorTextPrice,
  ErrorTextSellLocation,
  LabelCommentsSell,
  ErrorCommentSell,
  SexLabelStyled,
  SexRadioInput,
  SexButtonsWrap,
  LabelAddedPhoto,
} from './ThirdStep.styled';

const ThirdFormSell = ({
  formData,
  currentStatus,
  handleNextData,
  handlePrevStep,
  chooseOption,
}) => {
  const [state, setState] = useState({
    file: '',
    comments: '',
    location: formData.location || '',
    sex: formData.sex || '',
    price: formData.sex || '',
    active: null,
    errors: {},
  });

  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  const SexButton = ({ checked, onChange, value, label }) => {
    const isActive = selectedValue === value;

    return (
      <SexLabelStyled htmlFor={value} isActive={isActive}>
        <SexRadioInput
          id={value}
          type="radio"
          name="sex"
          value={value}
          label={label}
          checked={selectedValue === value}
          onChange={onChange}
        />
        {value === 'female' ? (
          <FemaleIcon fill="#F43F5E" />
        ) : (
          <MaleIcon fill="#54ADFF" />
        )}
        {value === 'female' ? 'Female' : 'Male'}
      </SexLabelStyled>
    );
  };

  const handleDone = () => {
    validationSchemaThirdAddSell
      .validate(state, { abortEarly: false })
      .then(() => {
        handleNextData(state);
      })
      .catch(err => {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setState(prevState => ({ ...prevState, errors: validationErrors }));
      });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setState(prevState => ({ ...prevState, file }));
  };

  const handlePhotoClick = e => {
    const fileInput = document.getElementById('photo');
    if (fileInput && !fileInput.files[0]) {
      return;
    }

    const file = e.target.files[0];
    setState(prevState => ({ ...prevState, file }));
  };

  const { file, comments, location, errors, price } = state;

  return (
    <div>
      <WrapForm>
        <Title>Add pet for sell</Title>

        <StatusIndicator
          currentStatus={currentStatus}
          chooseOption={chooseOption}
        />
        <PointBlock>
          <SexPhotoBlock>
            <SexContainer>
              <LabelSex>The Sex</LabelSex>

              <SexButtonsWrap>
                <SexButton
                  onChange={handleChange}
                  value="female"
                  label="Female"
                />
                <SexButton onChange={handleChange} value="male" label="Male" />
              </SexButtonsWrap>
              {errors.sex && <ErrorSex>{errors.sex}</ErrorSex>}
            </SexContainer>

            <PhotoContainerSell>
              <LabelAddPhoto>Load the pet’s image:</LabelAddPhoto>
              <div>
                <input
                  type="file"
                  id="photo"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              {file ? (
                <>
                  <LabelAddedPhoto htmlFor="photo" onClick={handlePhotoClick}>
                    <PreviewPhoto src={URL.createObjectURL(file)} alt="Pet" />
                  </LabelAddedPhoto>
                </>
              ) : (
                <>
                  <LabelAddedPhoto htmlFor="photo">
                    <LabelPhoto>
                      <Plus />
                    </LabelPhoto>
                  </LabelAddedPhoto>
                  {errors.file && (
                    <ErrorTextLowSell>{errors.file}</ErrorTextLowSell>
                  )}
                </>
              )}
            </PhotoContainerSell>
          </SexPhotoBlock>
          <InputContainer>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              value={location}
              onChange={e =>
                setState(prevState => ({
                  ...prevState,
                  location: e.target.value,
                }))
              }
              placeholder="Type of location"
            />
            {errors.location && (
              <ErrorTextSellLocation>{errors.location}</ErrorTextSellLocation>
            )}

            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={e =>
                setState(prevState => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
              required
              placeholder="Type of price"
            />
            {errors.price && <ErrorTextPrice>{errors.price}</ErrorTextPrice>}

            <LabelCommentsSell htmlFor="comments">Comments</LabelCommentsSell>
            <InputComments
              id="comments"
              value={comments}
              placeholder="Type comment"
              onChange={e =>
                setState(prevState => ({
                  ...prevState,
                  comments: e.target.value,
                }))
              }
            />
            {errors.comments && (
              <ErrorCommentSell>{errors.comments}</ErrorCommentSell>
            )}
          </InputContainer>
        </PointBlock>
        <ButtonRoutes>
          <ButtonNext textButton="Done" handleNextData={handleDone} />
          <ButtonPrev textButton="Back" handlePrevStep={handlePrevStep} />
        </ButtonRoutes>
      </WrapForm>
    </div>
  );
};

export default ThirdFormSell;
