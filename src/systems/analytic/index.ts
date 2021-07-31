import { VoiceState } from "discord.js";
import { Log, User } from "../database";
import getUserAction, { UserAction } from "./utils/getUserAction";

export async function logVoiceState(oldState: VoiceState, newState: VoiceState): Promise<void> {
  try {
    User.upsert(
      {
        id: oldState.member.id,
        nickname: oldState.member.displayName,
        active_time: 0,
        inactive_time: 0,
        szekizes: 0,
      },
      {
        id: null,
        active_time: null,
        inactive_time: null,
        szekizes: null,
      }
    );

    const userAction = getUserAction(oldState, newState);
    /** Log voicestate only if Join, Leave or Update is true but on Update, only log if user (un)muted themselfs */
    if (
      (userAction === UserAction.UPDATE && oldState.selfMute !== newState.selfMute) ||
      userAction === UserAction.JOIN ||
      userAction === UserAction.LEAVE
    ) {
      Log.create({
        id: null,
        user_id: oldState.member.id,
        timestamp: new Date(),
        connect: userAction === UserAction.JOIN ? 1 : 0,
        disconnect: userAction === UserAction.LEAVE ? 1 : 0,
        muted: newState.selfMute ? 1 : 0,
        szekizett: 0,
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
