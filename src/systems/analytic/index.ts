import { VoiceState } from "discord.js";
import { Log } from "../database";
import getUserAction, { UserAction } from "./utils/getUserAction";

export async function logVoiceState(oldState: VoiceState, newState: VoiceState): Promise<void> {
  const userAction = getUserAction(oldState, newState);
  if (userAction === UserAction.JOIN || userAction === UserAction.LEAVE || newState.selfMute) {
    try {
      Log.create({
        id: null,
        user_id: oldState.member.id,
        timestamp: Date.now().toString(),
        joined: userAction === UserAction.JOIN,
        left: userAction === UserAction.LEAVE,
        muted: newState.selfMute,
        szekizett: false,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
