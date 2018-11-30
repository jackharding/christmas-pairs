import React, { Component } from 'react';
import { TimelineMax } from "gsap/TweenMax";

import { ReactComponent as CandyCane } from '../svg/candy-cane.svg';

class CandyCaneWrap extends Component {
    constructor(props) {
        super(props);

        this.candyCane = React.createRef();

        this.state = {
            animating: false
        }
    }

    componentDidUpdate() {
        if(this.props.animate && !this.state.animating) {
            // this.wave();
        }
    }

    wave = () => {
        let leftArm = this.candyCane.current.querySelector('#left-arm'),
            rightArm = this.candyCane.current.querySelector('#right-arm');

        const t1 = new TimelineMax({
            repeat: -1,
        });
        const t2 = new TimelineMax({
            repeat: -1
        });

        t1.set(rightArm, {
            rotation: 4,
            transformOrigin: 'right bottom'
        })
            .to(rightArm, .5, {
                rotation: 4,
            })
            .to(rightArm, .5, {
                rotation: -4,
            })
            .to(rightArm, .5, {
                rotation: 4,
            });

        t2.set(leftArm, {
            rotation: 4,
            transformOrigin: 'left bottom'
        })
            .to(leftArm, .5, {
                rotation: 4,
            })
            .to(leftArm, .5, {
                rotation: -4,
            })
            .to(leftArm, .5, {
                rotation: 4,
            });
    }

    render() {
        return(
            <div ref={this.candyCane}>
                <CandyCane />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <CandyCaneWrap ref={ref} {...props} />);