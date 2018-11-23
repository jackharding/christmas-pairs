import React, { Component, Fragment } from 'react';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import styled from 'styled-components';

import { ReactComponent as Present } from '../svg/present.svg';

class Item extends Component {
    constructor(props) {
        super(props);

        this.present = React.createRef();
        this.item = React.createRef();

        this.state = {
            animateItem: false,
            open: false,
        }
    }

    openPresent = () => {
        if(this.state.open) return;

        this.setState({
            animateItem: false,
            open: true,
        });

        let bowLeft = this.present.current.querySelector('#bow-left'),
            bowRight = this.present.current.querySelector('#bow-right'),
            bowCenter = this.present.current.querySelector('#bow-center'),
            lidLeft = this.present.current.querySelector('#lid-left'),
            lidRight = this.present.current.querySelector('#lid-right'),
            item = this.item.current;

        TweenMax.to(bowLeft, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"right bottom"
        });
        TweenMax.to(bowRight, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"left bottom"
        })
        TweenMax.to(bowCenter, .2, {
            scale: .3,
            transformOrigin: "center bottom"
        });
        TweenMax.to(bowCenter, .4, {
            opacity: 0,
            delay: .2
        });
        TweenMax.to(lidLeft, .3, {
            delay: .3,
            rotation: -230,
            transformOrigin: "left center"
        });
        TweenMax.to(lidRight, .3, {
            delay: .3,
            rotation: 230,
            transformOrigin:"right center"
        });

        const t1 = new TimelineMax({
            delay: 1,
            onComplete: () => this.setState({ animateItem: true })
        });

        t1.set(item, {
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
            bottom: '3%'
        });
    }

    render() {
        let { Component } = this.props;

        return(
            <Fragment>
                <PresentWrap ref={this.present}>
                    <Present onClick={this.openPresent} />

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
    justify-content: center;
    width: 100%;
    
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
        opacity: 0;
    }
`;

export default Item;