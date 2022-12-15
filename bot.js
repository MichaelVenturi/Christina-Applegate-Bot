const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
require("dotenv").config();

const LegacyShoutout = require("./LegacyFunctions/LegacyShoutout");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const fs = require("fs");
const path = require("path");

fs.readdirSync("./Commands").filter((file) =>
  file.endsWith(".js").forEach((file) => {
    const command = require(`./Commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    client.commands.set(command.name, command);
  })
);

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

client.on("interactionCreate", async (interaction) => {});

client.login(process.env.TOKEN);
