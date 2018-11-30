import React from 'react';
import styled from 'styled-components';

const padSeconds = (int) => {
    if(int.toString().length === 2) return int;

    return "0" + int;
}

export default ({ minutes, seconds, completed }) => (
    <Timer completed={completed}>{ minutes }:{ padSeconds(seconds) }</Timer>
);

const Timer = styled.strong`
    display: block;
    text-align: center;
    font-size: ${({ completed }) => completed ? '64px' : '36px'};
    margin-top: ${({ completed }) => completed ? '250px' : '0'};
    color: #333;
`;