import React, {Component} from "react";
import Author from "../../assets/images/icons_people.png";

interface Props {
    post: {
        title: string,
        text: string,
        nameAuthor: string,
        time: string,
    }
}

class Post extends Component<Props> {

    render() {
        return (
            <div className="blocks__guides__info">
                <div className="blocks__guides__text">
                    <h2>{this.props.post.title}</h2>
                    <h2>{this.props.post.text}</h2>
                </div>
                <div className="blocks__guides__author__date__time">
                    <div className="icons_people">
                        <img alt="icons_people" src={Author} style={{width: "70px"}}/>
                    </div>
                    <div className="author_name">
                        <h3>{this.props.post.nameAuthor}</h3>
                    </div>
                    <div className="author__time-date_post">
                        <h3>{this.props.post.time}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;