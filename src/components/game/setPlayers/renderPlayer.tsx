import React, {Component} from "react";
import {connect} from "react-redux";
import AddPlayerModal from "../../Modals/addPlayer";
import {changePlayerInfo} from "../../../store/actions";

interface Props {
    number: number,
    player?: any,
    changePlayerInfo: any
}

interface State {
    role?: string
}

class RenderPlayer extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            role: ""
        }
    }

    changeRole = (e) => {
        let {value} = e.target;
        let pl = this.props.player;
        pl.role = value;
        this.props.changePlayerInfo(pl);
        this.setState({role: value})
    };

    componentDidUpdate() {
        if (this.state.role !== this.props.player.role)
            this.setState({role: this.props.player.role})
    }

    render() {
        return (
            <fieldset className="players-item">
                <legend>{this.props.number === 0 ? 'Ведучий' : this.props.number}</legend>
                {this.props.number === 0 ?
                    <div>
                        {this.props.player.ready ?
                            <p>
                        <span>
                            {this.props.player.name}
                        </span>
                            </p>
                            :
                            <AddPlayerModal number={this.props.number}/>}
                    </div>
                    : this.props.player.number ?
                        <p>
                        <span>
                        {this.state.role === 'Don' ? <i className="fas fa-user-secret"/> :
                            this.state.role === 'Mafia' ? <i className="fas fa-crosshairs"/> :
                                this.state.role === 'Sheriff' ? <i className="fab fa-empire"/> : null}
                            {this.props.player.name}
                        </span>
                            <select className="ChangeRole" required onChange={this.changeRole} defaultValue="civil">
                                <option value="Civil">Мирний житель</option>
                                <option value="Mafia">Мафія</option>
                                <option value="Don">Дон</option>
                                <option value="Sheriff">Шериф</option>
                            </select>
                        </p>
                        :
                        <AddPlayerModal number={this.props.number}/>
                }
            </fieldset>
        )
    }
}

const mapDispatchToProps = {
    changePlayerInfo
};
const mapStateToProps = function () {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(RenderPlayer)
