import React, { Component } from 'react';
import { TimelineMax } from "gsap/TweenMax";

import { ReactComponent as Santa } from '../svg/santa.svg';

class SantaWrap extends Component {
    constructor(props) {
        super(props);

        this.santa = React.createRef();

        this.state = {
            animating: false
        }
    }

    componentDidUpdate() {
        if(this.props.animate && !this.state.animating) {
            this.animate();
        }
    }

    animate = () => {
        this.setState({
            animating: true
        });

        let leftArm = this.santa.current.querySelector('#left-arm'),
            rightArm = this.santa.current.querySelector('#right-arm');

        const t1 = new TimelineMax({
            repeat: -1,
        });
        const t2 = new TimelineMax({
            repeat: -1
        });

        t1.set(rightArm, {
            rotation: -5,
            transformOrigin: 'right top'
        })
            .to(rightArm, .5, {
                rotation: -10,
            })
            .to(rightArm, .5, {
                rotation: -5,
            });

        t2.set(leftArm, {
            rotation: 5,
            transformOrigin: 'left top'
        })
            .to(leftArm, .5, {
                rotation: 10,
            })
            .to(leftArm, .5, {
                rotation: 5,
            });
    }

    render() {
        return(
            <div ref={this.santa}>
                <Santa />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <SantaWrap ref={ref} {...props} />);
