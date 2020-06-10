export class API {
    private static defaultPath = 'https://mafia-helper-back.herokuapp.com';

    static async sendGameInformation(body) {
        let response = await fetch(this.defaultPath + "/game-end", {
            method: 'PUT',
            body: body.toString()
        });
        return await response.json();
    }

    static async addNewPlayer(body) {
        let response = await fetch(this.defaultPath + "/create-game/", {
            method: 'PUT',
            body: body.toString()
        });
        return await response.json();
    }

    static async sendGameInformationRating(body) {
        let response = await fetch(this.defaultPath + "/rating-game/game-end/mp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body.toString()
        });
        return await response.json();
    }

    static async getAllPlayers() {
        let response = await fetch(this.defaultPath + "/create-game/select-player", {
            method: "GET"
        });
        return response.json()
    }

    static async getAllRoles() {
        let response = await fetch(this.defaultPath + "/create-game/", {
            method: 'GET'
        });
        return await response.json();
    }

    static async getAllGames() {
        let response = await fetch(this.defaultPath + "/history-games", {
            method: 'GET'
        });
        return await response.json();
    }

    static async sendExtraPoints(body) {
        let response = await fetch(this.defaultPath + "/rating-game/game-end/ep", {
            method: 'POST',
            headers: {
                'Accept': "*/*"
            },
            body: body.toString()
        });
        return await response.json();
    }
}