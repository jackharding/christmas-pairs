import React from 'react';

const padSeconds = (int) => {
    if(int.toString().length === 2) return int;

    return "0" + int;
}

export default ({ minutes, seconds }) => (
    <strong>{ minutes }:{ padSeconds(seconds) }</strong>
);