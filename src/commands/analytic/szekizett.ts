import { Message } from "discord.js";
import { Command } from "../../command-handler";
import { SzekiId } from "../../settings";
import { Log, User } from "../../systems/database";
import getMember from "../../utils/tools/getmember";

class Ping extends Command {
  public name = "Szekizett";
  public aliases = ["szeki"];
  public category = "Analytic";
  public desc = "Szekizés: Mikor valaki szó nélkül lenémítja magát vagy lelép a csevegésből.";
  public args = ["<user>"];
  public isDev = false;

  constructor() {
    super();
    this.init();
  }

  public async run(message: Message, args: string[]): Promise<void> {
    try {
      const member = getMember(message, args, false);
      const szeki = await message.client.users.fetch(SzekiId);
      if (!(member || szeki)) {
        message.channel.send("Nincs ilyen felhasználó!");
        return;
      }
      User.upsert(
        {
          id: member.id,
          nickname: member.displayName,
          active_time: 0,
          inactive_time: 0,
          szekizes: 1,
        },
        {
          id: null,
          active_time: null,
          inactive_time: null,
          szekizes: null,
        }
      );
      Log.create({
        id: null,
        user_id: member?.id || szeki?.id,
        timestamp: new Date(),
        connect: 0,
        disconnect: 0,
        muted: 0,
        szekizett: 1,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new Ping();
