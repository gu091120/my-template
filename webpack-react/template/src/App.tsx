import * as React from "react";
export default class App extends React.Component {
    state = {
        count: 1
    };
    componentDidMount() {
        console.log("didmount");
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.count}
                    <div>
                        <button
                            onClick={() => {
                                this.setState({
                                    count: this.state.count + 1
                                });
                            }}
                        >
                            点击
                        </button>
                    </div>
                    
                </div>
            </div>
        );
    }
}
