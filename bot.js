const {
  Client,
  Intents,
  Collection,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
require("dotenv").config();

const intents = new Intents(32767);

const client = new Client({
  intents,
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

const prefix = "!";

let frequency = 5;

client.on("ready", () => {
  console.log("bot online");
  client.user.setPresence({
    activities: [{ name: "Christina Applegate", type: "WATCHING" }],
  });
});

client.on("messageCreate", async (message) => {
  // ignore if its a DM to the bot
  if (message.author.bot || message.channel.type == "DM") return;
  // Only respond to the bot's command prefix
  if (!message.content.startsWith(process.env.PREFIX)) {
    if (Math.floor(Math.random() * frequency) + 1 == frequency) {
      message.channel.send({
        content: "Let's give a quick shoutout to Christina Applegate!",
        files: ["./images/Christina-Applegate.jpg"],
      });
    }
  }
  const args = message.content.substring(process.env.PREFIX.length).split(/ +/);
  console.log(args);
  switch (args[0].toLowerCase()) {
    case "shoutout":
      message.channel.send({
        content: "Let's give a quick shoutout to Christina Applegate!",
        files: ["./images/Christina-Applegate.jpg"],
      });
      break;
    case "setf":
      //console.log(parseInt(args[1]));
      if (!args[1]) {
        message.channel.send("invalid");
      } else {
        frequency = parseInt(args[1]);
        message.channel.send(`shoutout frequency set to 1 / ${frequency}`);
      }
  }
});

client.on("interactionCreate", async (interaction) => {});

client.login(process.env.TOKEN);
