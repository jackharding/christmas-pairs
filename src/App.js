import React, { Component, Fragment } from 'react';
import ReactTimeout from 'react-timeout';
import styled, { createGlobalStyle } from 'styled-components';
import _ from 'lodash';

import Board from './components/Board';
import Item from './components/Item';
import Timer from './components/Timer';
import DifficultySwitch from './components/DifficultySwitch';

import CandyCane from './components/CandyCane';
import GingerbreadMan from './components/GingerbreadMan';
import Mistletoe from './components/Mistletoe';
import Robin from './components/Robin';
import Santa from './components/Santa';
import Snowflake from './components/Snowflake';
import Snowman from './components/Snowman';
import Tree from './components/Tree';

import global from './styles/global';

const Styles = createGlobalStyle(global);

const items = [
    {
        value: 'candyCane',
        component: CandyCane
    },
    {
        value: 'gingerbread-man',
        component: GingerbreadMan
    },
    {
        value: 'mistletoe',
        component: Mistletoe
    },
    {
        value: 'robin',
        component: Robin
    },
    {
        value: 'santa',
        component: Santa
    },
    {
        value: 'snowflake',
        component: Snowflake
    },
    {
        value: 'tree',
        component: Tree
    },
    {
        value: 'snowman',
        component: Snowman
    },
];

const makeGameItems = (items, hard) => {
    items = items.map(item => ({
        uid: item.value,
        value: item.value,
        Component: item.component,
        active: false,
        removed: false
    }));

    items = [...items, ...items.map(item => ({
        ...item,
        uid: item.uid + 'pair'
    }))];


    if(hard) {
        // Make it control another random item
        let ogItems = [...items];

        items = items.map(item => {
            let randomItem = Math.floor(Math.random() * ogItems.length);
            randomItem = ogItems.splice(randomItem, 1);

            return {
                ...item,
                controls:  {
                    value: randomItem[0].value,
                    uid: randomItem[0].uid,
                },
            };
        });
    }

    return _.shuffle(items);
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hard: false,
            playing: false,
            items: [],
            guesses: [],
            timer: null,
            time: {
                minutes: 0,
                seconds: 0,
            }
        }
    }

    startGame = () => {
        this.setState({
            playing: true,
            items: makeGameItems(items, this.state.hard)
        });

        this.startTimer();
    }

    startTimer = () => {
        this.setState({
            timer: this.props.setInterval(() => this.addSecond(), 1000)
        });
    }

    stopTimer = () => {
        this.props.clearInterval(this.state.timer);
    }

    addSecond = () => {
        this.setState(prev => {
            let addMinute = prev.time.seconds === 59;

            let time = {
                ...prev.time,
                seconds: addMinute ? 0 : prev.time.seconds + 1,
            }

            if(addMinute) {
                time.minutes = prev.time.minutes + 1;
            }

            return {
                time
            };
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.guesses.length !== prevState.guesses.length && this.state.guesses.length > 1) {
            this.checkForMatch(this.state.guesses);
        }
    }

    changeDifficulty = (hard) => {
        this.setState({
            hard
        });
    }

    checkForMatch = (guesses) => {
        let items;

        // If the first/second items are a match, set removed key to true
        if(guesses[0] === guesses[1]) {
            items = this.state.items.map(item => {
                let obj = {
                    ...item
                }

                if(item.value === guesses[0]) {
                    obj.removed = true;
                }

                return obj;
            })
        } else {
            // Set the incorrect guesses to be inactive again
            items = this.state.items.map(item => {
                let obj = {
                    ...item
                }

                if(item.value === guesses[0] || item.value === guesses[1]) {
                    obj.active = false;
                }

                return obj;
            })
        }

        this.setState({
            items,
            guesses: [...guesses].slice(2, guesses.length)
        });
    }

    turnItem = (guess) => {
        if(guess.active) return;

        let { hard } = this.state;

        let value = guess.value;
        if(hard) {
            value = guess.controls.value;
        }

        // Set active key to true and add guess to end of guesses array
        this.setState({
            items: this.state.items.map(item => {
                let obj = {
                    ...item
                }

                let matchesGuess = guess.uid === item.uid;
                if(hard) {
                    matchesGuess = guess.controls.uid === item.uid;
                }

                if(matchesGuess) {
                    obj.active = true;
                }

                return obj;
            }),
            guesses: [...this.state.guesses, value]
        });
    }

    render() {
        let {
            playing,
            time,
            hard,
        } = this.state;

        return (
            <div className="App">
                { playing ?
                    <Fragment>
                        <Timer {...time} />
                        <Board>
                            { this.state.items.map(item => {
                                return(
                                    <Item
                                        {...item}
                                        onClick={() => this.turnItem(item)}
                                        key={item.uid}
                                    />
                                );
                            }) }
                        </Board>
                    </Fragment>
                    :
                    <StartScreen>
                        <h1>Christmas Pairs</h1>
                        <Controls>
                            <StartBtn onClick={this.startGame}>Play</StartBtn>
                            <DifficultySwitch
                                hard={hard}
                                onChange={this.changeDifficulty}
                            />
                        </Controls>
                    </StartScreen>
                }

                <Styles />
            </div>
        );
    }
}

const StartScreen = styled.div`
    padding-top: 125px;

    h1 {
        margin: 0 auto 75px;
        font-size: 84px;
        line-height: 110%;
        text-transform: uppercase;
        text-align: center;
        max-width: 600px;
        color: #333;
    }
`;

const Controls = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 200px;
    margin: 0 auto;
`;

const StartBtn = styled.button`
    width: 100%;
    padding: 16px 24px;
    border: 0;
    background: #AFCEA5;
    color: #efefef;
    font-size: 32px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 15px;
`;

export default ReactTimeout(App);