import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Cross } from '../svg/cross.svg';

export default ({ onClick }) => (
    <Quit onClick={onClick}>
        <Cross />
    </Quit>
);

const Quit = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 0 5px 5px;
    border: 0;
    background: none;
    cursor: pointer;
    
    svg {
        width: 18px;
    }
    
    path {
        fill: #333;
    }
`;