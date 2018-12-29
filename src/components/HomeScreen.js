import React from 'react';
import styled from 'styled-components';

// import DifficultySwitch from './DifficultySwitch';

export default ({ onStart, onDifficultyChange, hard, finalTime, completed }) => (
    <StartScreen>
        { finalTime && completed && <Score>You finished in { finalTime }</Score> }
        <h1>Xmas Pairs</h1>

        <Controls>
            <StartBtn onClick={onStart}>Play</StartBtn>
            {/*<DifficultySwitch*/}
                {/*hard={hard}*/}
                {/*onChange={onDifficultyChange}*/}
            {/*/>*/}
        </Controls>
    </StartScreen>
);

const StartScreen = styled.div`
    padding-top: 125px;

    h1 {
        margin: 0 auto 45px;
        font-size: 84px;
        line-height: 110%;
        text-transform: uppercase;
        text-align: center;
        max-width: 450px;
        color: #333;
        font-weight: 900;
    }
`;

const Controls = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 130px;
    margin: 0 auto;
`;

const StartBtn = styled.button`
    width: 100%;
    padding: 12px;
    border: 0;
    background: #5FB023;
    color: #efefef;
    font-size: 26px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 15px;
    transition: .3s;
    
    &:hover {
        background: #5fbf17;
    }
`;

const Score = styled.p`
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    margin: 0;
`;
