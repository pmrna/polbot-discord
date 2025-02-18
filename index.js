import fs, { readdirSync } from "node:fs";
import path, { join } from "node:path";
import { token } from "./config.json";

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = join(__dirname, "commands");
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandsFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of commandsFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
