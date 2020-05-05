import React, {Component} from "react";
import "./guidesPage.css";
import  Author from "../../assets/images/icons_people.png";
import Post from "../ResultGame/post";

class GuidesPage extends Component {

    post_tpm = [{
        id: 1,
        title: "Сегодня поговорим об онлайн договорах:",
        text: "1. Маскировка жертвы во время её речи.\n" +
            "                        Дон в ночь знакомства мафии показывает жест \"игроки говорят\" затем дон совершает\n" +
            "                            определённое действие - маркер/маяк. Во время дневного обслужения сострел будет назначен на\n" +
            "                            того игрока, на речи которого Дон повторит жест.\n" +
            "                        Недостатком даного онлайна является отвлечение внимания мафии на каждой речи ей придётся не\n" +
            "                            только слушать и запоминать речи, но держать в фокусе Дона, чтобы не просмотреть\n" +
            "                            жест... ",
        nameAuthor: "Vlad Kyselov",
        time: "19:52 | 8.12.2019",
    }]

    render() {
        return (
            <div className="guidesPage">
                <h1>Посібники</h1>
                {
                    this.post_tpm.map(post => {
                        return (
                            <Post key={post.id} post={post}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default GuidesPage;