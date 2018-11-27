import React from 'react';
import styled from 'styled-components';

const padSeconds = (int) => {
    if(int.toString().length === 2) return int;

    return "0" + int;
}

export default ({ minutes, seconds }) => (
    <Timer>{ minutes }:{ padSeconds(seconds) }</Timer>
);

const Timer = styled.strong`
    display: block;
    padding: 25px 0 50px;
    text-align: center;
    font-size: 36px;
`;