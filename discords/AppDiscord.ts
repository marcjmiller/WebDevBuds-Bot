import {
  ArgsOf,
  Client,
  CommandMessage,
  CommandNotFound,
  Discord,
  On,
} from "@typeit/discord";

const path = require("path");

// Discord commands are prefixed with "!", can come from ./commands
@Discord("!", {
  import: [path.join(__dirname, "..", "commands", "*.js")],
})
export class AppDiscord {
  
  @On("message")
  onMessage([message]: ArgsOf<"message">, client: Client) {

    const guild = client.guilds.cache.get("830536239559868486");

    const inactiveRole = guild!.roles.cache.find(
      (role) => role.name === "Inactive"
    );

    // logs every message the bot sees to the console, for testing atm
    console.log(message.content);

    if (message.member?.roles.cache.has(inactiveRole!.id)) {
      message.member.roles.remove(inactiveRole!.id);
    }

    // responds to mentions asking if the bot is awake
    if (
      message.mentions.has("830502230523379782") &&
      message.content.toLowerCase().includes("awake")
    ) {
      message.reply("Yes!");
    }
  }

  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    // if a command isn't found, reply with a message indicating that
    command.reply(`Command ${command} not found!`);
  }
}
