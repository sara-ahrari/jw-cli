import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import {
  CounterContainer,
  Row,
  Button,
  AsyncButton,
  Value,
  InputBox,
} from './Counter.styles';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <CounterContainer>
      <Row>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Value>{count}</Value>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Row>
      <Row>
        <InputBox
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>
        <AsyncButton onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </AsyncButton>
        <Button onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </Button>
      </Row>
    </CounterContainer>
  );
};

export default Counter;
