import React, { Component } from 'react';
import { TimelineMax } from "gsap/TweenMax";

import { ReactComponent as GingerbreadMan } from '../svg/gingerbread-man.svg';

class GingerbreadManWrap extends Component {
    constructor(props) {
        super(props);

        this.gingerbreadMan = React.createRef();

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
        let leftArm = this.gingerbreadMan.current.querySelector('#left-arm'),
            rightArm = this.gingerbreadMan.current.querySelector('#right-arm');

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
            <div ref={this.gingerbreadMan}>
                <GingerbreadMan />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <GingerbreadManWrap ref={ref} {...props} />);