import { readdir, readdirSync } from "node:fs";
import { join } from "node:path";

import { Client, Events, GatewayIntentBits } from "discord.js";
import { token } from "./config.json";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = join(__dirname, "commands");
const commandFolders = readdir(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandsFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of commandsFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.command.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
