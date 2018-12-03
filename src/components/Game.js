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
        value: 'gingerbreadMan',
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
]

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

    items = _.shuffle(items);

    let obj = {};

    items.forEach(item => {
        obj[item.uid] = item;
    });

    return obj;
}

class Game extends Component {
    state = {
        items: {},
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
            this.checkForMatches(this.state.guesses);
        }

        if(this.state.remaining < 1) {
            this.props.onComplete();
        }
    }

    setItems = (reset) => {
        const items = reset ? [] : makeGameItems(gifts, this.props.hard);
        // console.log(items);

        this.setState({
            items,
            remaining: items.length,
        });
    }

    checkForMatches = (guesses) => {
        let items = { ...this.state.items };

        console.log(guesses[0] === guesses[1], guesses, items[guesses[0]], items[guesses[1]])
        // If the first/second items are a match, set removed key to true
        if(guesses[0] === guesses[1]) {

            items[guesses[0]].removed = true;
            items[guesses[0] + 'pair'].removed = true;

        } else {
            // Set the incorrect guesses to be inactive again
            items[guesses[0]].active = false;
            items[guesses[1]].active = false;
        }

        this.setState(prev => ({
            items,
            guesses: [...guesses].slice(2, guesses.length),
            remaining: guesses[0] === guesses[1] ? prev.remaining - 1 : prev.remaining
        }));
    }

    turnItem = (guess) => {
        if(guess.active) return;
        console.log('turning', guess.uid);

        let { hard } = this.props;

        let value = guess.value;
        if(hard) {
            value = guess.controls.value;
        }

        let items = { ...this.state.items };
        items[guess.uid].active = true;

        // Set active key to true and add guess to end of guesses array
        this.setState({
            // items: this.state.items.map(item => {
            //     let obj = {
            //         ...item
            //     }
            //
            //     let matchesGuess = guess.uid === item.uid;
            //     if(hard) {
            //         matchesGuess = guess.controls.uid === item.uid;
            //     }
            //
            //     if(matchesGuess) {
            //         obj.active = true;
            //     }
            //
            //     return obj;
            // }),
            items,
            guesses: [...this.state.guesses, value]
        });
    }

    render() {
        return(
            <Board>
                { Object.entries(this.state.items).map(item => {
                    return(
                        <Item
                            {...item[1]}
                            onClick={() => this.turnItem(item[1])}
                            key={item[1].uid}
                        />
                    );
                }) }
            </Board>
        );
    }
}

export default Game;