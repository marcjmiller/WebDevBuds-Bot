import { Client, Command, CommandMessage, Infos } from "@typeit/discord";
import { formatDistanceToNow, isBefore, sub } from "date-fns";
import { GuildMember } from "discord.js";
import { ROLES } from "../utils";

const memberInactive = (
  member: GuildMember,
  time: { [key: string]: number }
) => {
  if (member.lastMessage?.createdAt) {
    return isBefore(member.lastMessage!.createdAt, sub(new Date(), time));
  }

  if (member.joinedAt) {
    return isBefore(member.joinedAt, sub(new Date(), time));
  }
};

export default abstract class Prune {
  @Command("prune")
  @Infos({
    admin: true,
    description: "Prunes users who have been inactive for <a long time>",
  })
  prune(message: CommandMessage, client: Client) {
    // a list of role names that are allowed to use !prune command
    const adminRoles = ["Admin"];
    const inactiveRole = message!.guild!.roles.cache.find(
      (role) => role.name === "Inactive"
    );
    const ignoreThisRole = message!.guild!.roles.cache.find(
      (role) => role.name === "Admin"
    );

    const guild = client.guilds.cache.get("830536239559868486"); // store the server info in an object

    // set this to change the time that a user must be inactive for them to get the inactive role
    const time = {
      hours: 1,
    };

    if (
      // check member who used command has Admin role
      message.member?.roles.cache.some((role) => adminRoles.includes(role.name))
    ) {
      guild &&
        guild.members.cache
          .filter((member) => !member.user.bot) // ignore bot accounts
          .filter((member) => !member.roles.cache.has(ignoreThisRole!.id)) // ignore admin accounts
          .forEach((member) => {
            if (memberInactive(member, time)) {
              inactiveRole && member.roles.add(inactiveRole);
              message.channel.send(
                `${member.displayName} inactive > ${Object.values(time)[0]} ${
                  Object.keys(time)[0]
                }, giving Inactive role...`
              );
              guild.members.cache
                .get(member.id)
                ?.send(
                  `You've been marked as Inactive on the ${guild.name} Discord. In order to remove this role, just say something in any channel and I'll remove it, otherwise you will be kicked from the server.`
                );
            }
          });
    } else {
      message.reply(`you don't have permission to do that!`);
    }
  }
}
