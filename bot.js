const { Client, Intents, Collection } = require("discord.js");
require("dotenv").config();

const intents = new Intents(32767);

const client = new Client({
  intents,
});

client.commands = new Collection();

const fs = require("fs");
fs.readdirSync("./Commands").filter((file) =>
  file.endsWith(".js").forEach((file) => {
    const command = require(`./Commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    client.commands.set(command.name, command);
  })
);

const prefix = "!";

client.on("ready", () => {
  console.log("bot online");
  client.user.setPresence({
    activities: [{ name: "Christina Applegate", type: "WATCHING" }],
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || message.channel.type == "DM") return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content.substring(process.env.PREFIX.length).split(/ +/);
  console.log(args);
  switch (args[0].toLowerCase()) {
    case "shoutout":
      message.reply("Let's give a quick shoutout to Christina Applegate!");
  }
});

client.on("interactionCreate", async (interaction) => {});

client.login(process.env.TOKEN);
