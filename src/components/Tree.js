import React, { Component } from 'react';
import { TweenMax } from "gsap/TweenMax";

import { ReactComponent as Tree } from '../svg/tree.svg';

class TreeContainer extends Component {
    constructor(props) {
        super(props);

        this.tree = React.createRef();

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

        const circles = this.tree.current.querySelectorAll('#baubles circle');

        TweenMax.staggerFromTo(circles, .2, {
            opacity: 1
        }, {
            opacity: .7,
            yoyo: true,
            repeat: -1
        }, .1)
    }

    render() {
        return(
            <div ref={this.tree}>
                <Tree />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <TreeContainer ref={ref} {...props} />);
