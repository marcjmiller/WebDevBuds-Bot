import { ArgsOf, Client, Command, CommandMessage, CommandNotFound, Description, Discord, On } from "@typeit/discord";
import { formatDistanceToNow } from "date-fns";


@Discord("!") // commands are prefixed with "!"
export class AppDiscord {
  @On("message")
  onMessage([message]: ArgsOf<"message">) {
    // logs every message the bot sees to the console, for testing atm
    console.log(message.content);
  }

  @Command("prune")
  @Description("Prunes users who have been inactive for <a long time>")
  onPrune(message: CommandMessage, client: Client) {
    // a list of role names that are allowed to use !prune command
    const adminRoles = ["Admin"]
    
    // make sure the requestor has roles that would allow them to call this command
    if (message.member?.roles.cache.some(role => adminRoles.includes(role.name))) {
      client.guilds.fetch("830536239559868486")         // fetch the server info
        .then(guild => guild.members.fetch())           // fetch a list of all members on the server
        .then(members => members.forEach(member => {    // fetch all the members, and loop through them
          console.log(`${member.displayName}`)          // log their name to the console
          // log some data about the user
          console.log('last msg date', member.lastMessage?.createdAt, 'joined', member.joinedAt)

          // try to log their ast message date, pretty format how long ago 
          console.log('last msg from now', formatDistanceToNow(member.lastMessage?.createdAt || 0))

          // try to log when the joined, pretty format how long ago
          console.log('since joined', formatDistanceToNow(member.joinedAt || 0))
        }))
    } else {
      // if the user doesn't have a proper role, tell them they're not allowed to use this command
      message.reply(`You're not allowed to use that command.`)
    }
  }

  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    // if a command isn't found, reply with a message indicating that
    command.reply(`Command ${command} not found!`)
  }
}
