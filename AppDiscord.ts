import { ArgsOf, Client, Command, CommandMessage, CommandNotFound, Description, Discord, On } from "@typeit/discord";


@Discord("!")
export class AppDiscord {
  @On("message")
  onMessage([message]: ArgsOf<"message">, client: Client) {
    console.log(message.content);
  }

  @Command("prune")
  @Description("Prunes users who have been inactive for <a long time>")
  onPrune(message: CommandMessage) {
    message.reply("Pruning users now...")
  }

  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    command.reply(`Command ${command} not found!`)
  }
}
