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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    await interaction.reply({
      content: "There was an error while executing this command",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message) => {
  LegacyShoutout(client, message);
});

client.login(process.env.TOKEN);
