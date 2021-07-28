import { Client } from "discord.js";

import "./structures";
import "./command-handler";
import "./commands";

import EventHandler from "./event-handler";

import logger from "./logger";

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

client.on("ready", () => {
  EventHandler(client);
  logger.info("Ready!");
});

client.login(process.env.TOKEN).catch(logger.error);
