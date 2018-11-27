import React, { Component, Fragment } from 'react';
import ReactTimeout from 'react-timeout';
import styled, { createGlobalStyle } from 'styled-components';
import _ from 'lodash';

import Board from './components/Board';
import Item from './components/Item';
import Timer from './components/Timer';
import Snowman from './components/Snowman';
import Tree from './components/Tree';

import global from './styles/global';
import { create } from 'domain';

const Styles = createGlobalStyle(global);

const items = [
    {
        value: 'tree',
        component: Tree
    },
    {
        value: 'snowman',
        component: Snowman
    },
    // {
    //     value: 'candycane',
    //     component: CandyCane
    // },
    // {
    //     value: 'misletoe',
    //     component: Misletoe
    // },
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

    compareItems = (a, b, uid) => {
        if(this.state.hard) {
            return a.controls[uid] === b[uid];
        } else {
            return a[uid] === b[uid];
        }
    }

    checkForMatch = (guesses) => {
        let items;

        console.log('GYESS', guesses)
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
            time
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
                    <StartBtn onClick={this.startGame}>Play</StartBtn>
                }

                <Styles />
            </div>
        );
    }
}

const StartBtn = styled.button`
    position: relative;
    display: table;
    margin: 0 auto;
    padding: 12px 24px;
    top: 75px;
    border: 0;
    background: #78adf2;
    color: #efefef;
    font-size: 20px;
    cursor: pointer;
`;

export default ReactTimeout(App);