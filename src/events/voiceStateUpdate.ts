import { VoiceState } from "discord.js";
import { logVoiceState } from "../systems/analytic";

export default function (oldState: VoiceState, newState: VoiceState): void {
  logVoiceState(oldState, newState);
}
