import { Client } from "discord.js";
import message from "./events/message";
import voiceStateUpdate from "./events/voiceStateUpdate";

export default function (client: Client): void {
  client.on("message", message);
  client.on("voiceStateUpdate", voiceStateUpdate);
}
