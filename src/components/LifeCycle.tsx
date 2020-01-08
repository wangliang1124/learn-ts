import React from "react";

class LifeCycle extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { str: "hello" };
    }

    componentWillMount() {
        alert("componentWillMount");
    }

    componentDidMount() {
        alert("componentDidMount");
    }

    componentWillReceiveProps(nextProps: any) {
        alert("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        alert("shouldComponentUpdate");
        return true; // 记得要返回true
    }

    componentWillUpdate() {
        alert("componentWillUpdate");
    }

    componentDidUpdate() {
        alert("componentDidUpdate");
    }

    componentWillUnmount() {
        alert("componentWillUnmount");
    }
    render() {
        alert("render");
        return (
            <div>
                <span>{/* <h2>{parseInt(this.props.num)}</h2> */}</span>
                <br />
                <span>{/* <h2>{this.state.str}</h2> */}</span>
            </div>
        );
    }
}

export default LifeCycle;
