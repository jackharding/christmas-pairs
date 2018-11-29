import React, { Component, Fragment } from 'react';
import { TweenMax, TimelineLite } from "gsap/TweenMax";
import styled from 'styled-components';
import ReactTimeout from 'react-timeout';

import { ReactComponent as Present } from '../svg/present.svg';

class Item extends Component {
    constructor(props) {
        super(props);

        this.present = React.createRef();
        this.item = React.createRef();

        this.presentTimeline = new TimelineLite({ paused: true });
        this.itemTimeline = new TimelineLite({
            paused: true,
            onComplete: () => this.setState({ animateItem: true })
        });

        this.state = {
            open: false,
            animateItem: false,
            timelinesSet: false,
            itemPicked: null,
            removed: false,
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps, this.props)
        if(!prevProps.active && this.props.active) {
            this.openPresent(this.props.uid);
        }

        if(prevProps.active && !this.props.active) {
            this.props.setTimeout(() => this.openPresent(this.props.uid, true), 1900);
        }

        if(!prevProps.removed && this.props.removed) {
            this.props.setTimeout(() => this.setState({
                removed: true
            }), 1900);
        }

        if(this.present.current && this.item.current && !this.state.timelinesSet) {
            this.setTimelines();
        }
    }

    setTimelines = () => {
        let bowLeft = this.present.current.querySelector('#bow-left'),
            bowRight = this.present.current.querySelector('#bow-right'),
            bowCenter = this.present.current.querySelector('#bow-center'),
            lidLeft = this.present.current.querySelector('#lid-left'),
            lidRight = this.present.current.querySelector('#lid-right'),
            item = this.item.current;

        this.presentTimeline.to(bowLeft, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"right bottom"
        }, 0)
        .to(bowRight, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"left bottom"
        }, 0)
        .to(bowCenter, .2, {
            scale: .3,
            transformOrigin: "center bottom"
        }, .2)
        .to(bowCenter, .4, {
            opacity: 0,
            delay: .2
        }, 0)
        .to(lidLeft, .3, {
            delay: .3,
            rotation: -230,
            transformOrigin: "left center"
        }, .3)
        .to(lidRight, .3, {
            delay: .3,
            rotation: 230,
            transformOrigin:"right center"
        }, .3);

        this.itemTimeline.set(item, {
            zIndex: 1,
            opacity: 1
        })
        .to(item, .5, {
            bottom: '79%'
        })
        .set(item, {
            zIndex: 3
        })
        .to(item, .5, {
            bottom: '2%'
        });

        this.setState({
            timelinesSet: true
        });
    }

    openPresent = (uid, reverse) => {
        this.setState(prev => ({
            animateItem: !prev.animateItem,
            open: !prev.open,
        }));

        // TODO: Why isn't reverse delay working?
        if(reverse) {
            this.itemTimeline.reverse();
            TweenMax.delayedCall(1, () => this.presentTimeline.reverse())
        } else {
            this.presentTimeline.play();
            this.itemTimeline.delay(1).play();
        }
    }

    test = () => {
        this.openPresent(null, this.state.open);
    }

    render() {
        let { Component } = this.props;

        return(
            <Fragment>
                <PresentWrap
                    ref={this.present}
                    removed={this.state.removed}
                >
                    <Present onClick={this.props.onClick} />

                    <div
                        className="present-item"
                        ref={this.item}
                    >
                        <Component animate={this.state.animateItem} />
                    </div>
                </PresentWrap>
            </Fragment>
        );
    }
}

const PresentWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    transition: opacity .3s;
    opacity: ${({ removed }) => removed ? 0 : 1};
    
    >svg {
        position: relative;
        z-index: 2;
        width: 100%;
        height: auto;
    }
    
    .present-item {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 50%;
        bottom: 3%;
        transform: translateX(-50%);
        width: 100%;
        height: 71%;
        opacity: 0;
        
        >div {
            width: 60%;
            
            svg {
                width: 100%;
                height: auto;
                max-height: 100%;
            }
        }
    }
`;

export default ReactTimeout(Item);