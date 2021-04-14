import { Command, CommandMessage, Description } from "@typeit/discord";

export default abstract class Ping {
  @Command("ping")
  @Description("responds to !ping with `Pong!`")
  async pingPong(command: CommandMessage) {
    !command?.member?.user.bot && command.channel.send("Pong!");
  }
}