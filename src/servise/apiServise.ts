export class API {
    private static defaultPath: 'localhost:8080';

    static async sendGameInformation(body) {
        let response = await fetch(this.defaultPath + "/game-end/save", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body.toString()
        });
        return await response.json();
    }
    static async getAllPlayers() {
        let response = await fetch(this.defaultPath + "/create-game/select-player", {
            method: 'GET',
            headers: {
                'Accept': "*/*"
            }
        });
        return await response.json();
    }
    static async getAllRoles() {
        let response = await fetch(this.defaultPath + "/create-game/", {
            method: 'GET',
            headers: {
                'Accept': "*/*"
            }
        });
        return await response.json();
    }
}