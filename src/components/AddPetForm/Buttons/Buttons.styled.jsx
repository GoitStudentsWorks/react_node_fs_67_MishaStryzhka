import styled from 'styled-components';

export const BtnChoose = styled.button`
  font-size: 14px;
  line-height: 1.33;
  padding: 8px 16px;
  color: #54adff;
  background: #cce4fb;
  border: none;
  border-radius: 40px;
  margin-bottom: 12px;
  width: fit-content;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    color: #fef9f9;
    background: #54adff;
  }
`;

export const BtnContainer = styled.ul`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  flex: 1;
  margin-bottom: 80px;

  @media screen and (min-width: 768px) {
    margin-top: 24px;
    margin-bottom: 120px;
  }
`;

export const BtnRoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  gap: 20px;
  margin-top: 24px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 0px;

  @media screen and (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: center;
    align-self: center;
    margin-bottom: 20px;
  }
`;

export const BtnNext = styled.button`
  margin-right: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.38;
  color: #fef9f9;
  background-color: #54adff;
  border: none;
  border-radius: 40px;
  text-decoration: none;
  align-items: center;
  width: 248px;
  height: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  text-transform: none;
  gap: 12px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const BtnPrev = styled.button`
  margin-left: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.38;
  color: #54adff;
  background-color: transparent;
  border: none;
  text-decoration: none;
  height: 40px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  gap: 12px;

  &:hover,
  &:focus {
    background-color: linear-gradient(290.46deg, #419ef1 0%, #9bd0ff 107.89%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;
