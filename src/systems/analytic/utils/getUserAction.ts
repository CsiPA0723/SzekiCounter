import { VoiceState } from "discord.js";

export enum UserAction {
  JOIN,
  LEAVE,
  CHANGE,
  UPDATE,
}

/**
 * Determines the user action based on the old and new voicestate channelid type.
 *
 * | oldChannelId | newChannelId | state   |
 * | ------------ | ------------ | ------- |
 * | `undefined`  | `string`     | `join`  |
 * | `string`     | `null `      | `leave` |
 */
export default function getUserAction(
  { channelID: oldChannelID }: VoiceState,
  { channelID: newChannelID }: VoiceState
): UserAction {
  if (!oldChannelID && newChannelID) return UserAction.JOIN;
  if (oldChannelID && !newChannelID) return UserAction.LEAVE;
  if (oldChannelID === newChannelID) return UserAction.UPDATE;
  if (oldChannelID && newChannelID && oldChannelID !== newChannelID) {
    return UserAction.CHANGE;
  }
  throw new Error("UNKOWN User Action");
}
