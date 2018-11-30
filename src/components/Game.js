import React, { Component } from 'react';
import _ from 'lodash';

import Item from './Item';
import Board from './Board';

import CandyCane from './CandyCane';
import GingerbreadMan from './GingerbreadMan';
import Mistletoe from './Mistletoe';
import Robin from './Robin';
import Santa from './Santa';
import Snowflake from './Snowflake';
import Snowman from './Snowman';
import Tree from './Tree';

const gifts = [
    {
        value: 'candyCane',
        component: CandyCane
    },
    {
        value: 'gingerbread-man',
        component: GingerbreadMan
    },
    // {
    //     value: 'mistletoe',
    //     component: Mistletoe
    // },
    // {
    //     value: 'robin',
    //     component: Robin
    // },
    // {
    //     value: 'santa',
    //     component: Santa
    // },
    // {
    //     value: 'snowflake',
    //     component: Snowflake
    // },
    // {
    //     value: 'tree',
    //     component: Tree
    // },
    // {
    //     value: 'snowman',
    //     component: Snowman
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

    // return _.shuffle(items);
    return items;
}

class Game extends Component {
    state = {
        items: [],
        guesses: [],
        remaining: 0
    }

    componentDidMount() {
        this.setItems();
    }

    componentWillUnmount() {
        this.setItems(true);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.guesses.length !== prevState.guesses.length && this.state.guesses.length > 1) {
            this.checkForMatch(this.state.guesses);
        }

        if(this.state.remaining < 1) {
            this.props.onComplete();
        }
    }

    setItems = (reset) => {
        console.log('hard?', this.props.hard)
        const items = reset ? [] : makeGameItems(gifts, this.props.hard);

        this.setState({
            items,
            remaining: items.length,
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

        this.setState(prev => ({
            items,
            guesses: [...guesses].slice(2, guesses.length),
            remaining: guesses[0] === guesses[1] ? prev.remaining - 1 : prev.remaining
        }));
    }

    turnItem = (guess) => {
        if(guess.active) return;

        console.log(guess)
        let { hard } = this.props;

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
        return(
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
        );
    }
}

export default Game;