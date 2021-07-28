import { Client, Structures } from "discord.js";
import { DevId, SzekiId } from "../settings";

declare module "discord.js" {
  interface User {
    isDev: boolean;
    isSzeki: boolean;
  }
}

Structures.extend("User", (User) => {
  class CustomUser extends User {
    public isDev = this.id === DevId;
    public isSzeki = this.id === SzekiId;

    constructor(client: Client, data: Record<string, unknown>) {
      super(client, data);
    }
  }

  return CustomUser;
});
