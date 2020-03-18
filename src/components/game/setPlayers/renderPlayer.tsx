import React, {Component} from "react";
import AddPlayerModal from "../../Modals/addPlayer";

interface Props {
    number: number,
    player?: any
}

class RenderPlayer extends Component<Props, {}> {

    render() {
        return (
            <div className="players-item">
                {this.props.player.number ?
                    <p>
                        {this.props.number+') '+this.props.player.name}
                        {this.props.player.role === 'don' ? <i className="fas fa-user-secret"/>:
                            this.props.player.role === 'mafia' ? <i className="fas fa-crosshairs"/> :
                                this.props.player.role === 'sheriff'? <i className="fab fa-empire"/> : null}
                    </p>
                    :
                    <AddPlayerModal number={this.props.number}/>
                }
            </div>
        )
    }
}


export default RenderPlayer
