import { Client } from "@typeit/discord";


const path = require("path");
export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    this._client = new Client({
      fetchAllMembers: true,
      variablesChar: ":",
      classes: ["*.ts", "*.js"],
    });

    this._client.login(
      process.env.TOKEN || "",
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`
    );

    this._client.on("ready", () => {
      console.log(Client.getCommands());
    });
  }
}

Main.start();
