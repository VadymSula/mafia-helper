import React, {Component} from "react";
import "./guidesPage.css";

class GuidesPage extends Component {

    render() {
        return (
            <main className="guidesPage">
                <h1>Посібники</h1>
                <div className="blocks__guides__info">
                    <div className="blocks__guides__text">
                        <h2><img alt="smile-1" src="images/icons_guides/smile-1.png" style={{width:"26"}}/>Сегодня поговорим об
                                                                                                         онлайн
                                                                                                         договорах:</h2>
                        <h2> 1. Маскировка жертвы во время её речи.</h2>
                        <h2>Дон в ночь знакомства мафии показывает жест "игроки говорят" затем дон совершает
                            определённое действие - маркер/маяк. Во время дневного обслужения сострел будет назначен на
                            того игрока, на речи которого Дон повторит жест. </h2>
                        <h2>Недостатком даного онлайна является отвлечение внимания мафии на каждой речи ей придётся не
                            только слушать и запоминать речи, но держать в фокусе Дона, чтобы не просмотреть
                            жест... </h2>
                    </div>
                    <div className="blocks__guides__author__date__time">
                        <div className="icons_people">
                            <img alt="icons_people" src="images/icons_guides/icons_people.png" style={{width:"70"}} />
                        </div>
                        <div className="author_name">
                            <h3> Vlad Kyselov</h3>
                        </div>
                        <div className="author__time-date_post">
                            <h3> 19:52 | 8.12.2019</h3>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default GuidesPage;