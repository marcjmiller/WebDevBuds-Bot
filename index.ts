import { Client } from "@typeit/discord";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    this._client = new Client();

    this._client.login(
      process.env.TOKEN || "",
      `${__dirname}/*Discord.ts`,
      `${__dirname}/*Discord.js`
    );

    console.log(Client.getCommands());
  }
}

Main.start();
