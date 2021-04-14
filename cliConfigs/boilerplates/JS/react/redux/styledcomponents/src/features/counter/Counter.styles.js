import styled from 'styled-components';

export const CounterContainer = styled.div`
  background-color: black;
  opacity: 70%;
  width: 65%;
  align-self: center;
  border-radius: 50px;
  margin-top: 2vmin;
  padding: 5vmin;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-left: 4px;
    margin-right: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Button = styled.button`
  appearance: none;
  background-color: white;
  border-radius: 20px;
  min-width: 10vmin;
  font-size: 32px;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  border: 2px solid #f9cdda;
  color: black;
  padding-bottom: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover,
  &:focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }

  &:active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

export const AsyncButton = styled(Button)`
  position: relative;

  &:after {
    content: '';
    background-color: rgba(112, 76, 182, 0.15);
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    transition: width 1s linear, opacity 0.5s ease 1s;
  }

  &:active:after {
    width: 0%;
    opacity: 1;
    transition: 0s;
  }
`;

export const InputBox = styled.input`
  font-size: 32px;
  border-radius: 20px;
  padding: 2px;
  width: 64px;
  text-align: center;
  margin-right: 4px;
`;

export const Value = styled.span`
  color: #f9cdda;
  font-size: 78px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 2px;
`;
