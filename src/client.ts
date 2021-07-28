import { Client, TextChannel } from "discord.js";

import "./structures";
import "./command-handler";
import "./commands";
import "./systems/database";

import EventHandler from "./event-handler";
import ClientTools from "./utils/client-tools";
import logger from "./logger";
import { LogChannelId } from "./settings";

const client = new Client({
  partials: ["GUILD_MEMBER", "CHANNEL", "MESSAGE", "REACTION", "USER"],
  ws: {
    intents: [
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
      "GUILDS",
      "GUILD_BANS",
      "GUILD_EMOJIS",
      "GUILD_INTEGRATIONS",
      "GUILD_INVITES",
      "GUILD_MEMBERS",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGE_TYPING",
      "GUILD_PRESENCES",
      "GUILD_VOICE_STATES",
      "GUILD_WEBHOOKS",
    ],
  },
});

declare module "discord.js" {
  interface Client {
    logChannel: TextChannel;

    tools: typeof ClientTools;
  }
}

client.tools = ClientTools;

client.on("ready", () => {
  client.logChannel = <TextChannel>client.channels.resolve(LogChannelId);

  EventHandler(client);

  logger.info("Ready!");
});

client.login(process.env.TOKEN).catch(logger.error);
