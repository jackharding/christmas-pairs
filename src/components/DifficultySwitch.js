import React from 'react';
import styled from 'styled-components';

export default ({ hard, onChange }) => (
    <Wrapper>
        <Input
            type="radio"
            id={'easy'}
            onChange={onChange}
            checked={!hard}
        />
        <label htmlFor={'easy'}>Easy</label>

        <Input
            type="radio"
            id={'hard'}
            onChange={onChange}
            checked={hard}
        />
        <label htmlFor={'hard'}>Hard</label>
    </Wrapper>
);

const Wrapper = styled.div`

`;

const Input = styled.input`
    display: none;
   
    &:checked { 
        +label {
            background: red;
        }
    }
`;