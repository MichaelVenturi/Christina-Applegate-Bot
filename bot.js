const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const LegacyShoutout = require("./LegacyFunctions/LegacyShoutout");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  console.log(`Command ${command.data.name} loaded`);
  client.commands.set(command.data.name, command);
}

client.shoutoutFreq = 10;

client.on("ready", () => {
  console.log("bot online");
  client.user.setPresence({
    activities: [{ name: "Eric Andre", type: "WATCHING" }],
  });
});

client.on("messageCreate", async (message) => {
  LegacyShoutout(client, message);
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
});

client.login(process.env.TOKEN);
