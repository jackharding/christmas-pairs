import React from 'react';
import styled from 'styled-components';

export default ({ hard, onChange }) => (
    <Outer>
        <h3>Difficulty</h3>
        <Inner>
            <Input
                type="radio"
                id={'easy'}
                onChange={() => onChange(false)}
                checked={!hard}
            />
            <label htmlFor={'easy'}>Easy</label>

            <Input
                type="radio"
                id={'hard'}
                onChange={() => onChange(true)}
                checked={hard}
            />
            <label htmlFor={'hard'}>Hard</label>
        </Inner>
    </Outer>
);

const Outer = styled.div`
    margin-top: 50px;
    
    h3 {
        display: none;
        margin: 0 0 10px;
        color: #333;
        text-align: center;
        font-size: 18px;
    }
`;

const Inner = styled.nav`
    width: 140px;
    display: flex;
    
    >label {
        width: 50%;
        padding: 4px 0;
        background: #fff;
        cursor: pointer;
        border: 2px solid #00ABD6;
        color: #00ABD6;
        text-align: center;
    
        &:first-of-type {
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
            padding-left: 5px;
        }
        &:last-of-type {
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            padding-right: 5px;
        }
    }
`;

const Input = styled.input`
    display: none;
    
    &:first-of-type:checked+label {
        border-right: 0;
    }
    &:last-of-type:checked+label {
        border-left: 0;
    }
   
    &:checked { 
        +label {
            background: #00ABD6;
            color: #fff;
        }
    }
`;