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
    }

    componentDidUpdate() {
        if (this.state.role !== this.props.player.role)
            this.setState({role: this.props.player.role})
    }

    render() {
        return (
            <div className="players-item">
                {this.props.player.number ?
                    <p>
                        <span>
                        {this.state.role === 'don' ? <i className="fas fa-user-secret"/> :
                            this.state.role === 'mafia' ? <i className="fas fa-crosshairs"/> :
                                this.state.role === 'sheriff' ? <i className="fab fa-empire"/> : null}
                            {this.props.number + ') ' + this.props.player.name}
                        </span>
                        <select className="ChangeRole" required onChange={this.changeRole}>
                            <option value="none">--Оберіть роль--</option>
                            <option value="civil">Мирний житель</option>
                            <option value="mafia">Мафія</option>
                            <option value="don">Дон</option>
                            <option value="sheriff">Шериф</option>
                        </select>
                    </p>
                    :
                    <AddPlayerModal number={this.props.number}/>
                }
            </div>
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
