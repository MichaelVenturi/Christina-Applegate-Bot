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
//const image = new MessageAttachment("./images/Christina-Applegate.jpg");
const embed = new MessageEmbed()
  .setTitle("title")
  .setThumbnail("attachment://Christina-Applegate.jpg");

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
      //const image = new MessageAttachment("./images/Christina-Applegate.jpg");
      message.channel.send({
        content: "Let's give a quick shoutout to Christina Applegate!",
        files: ["./images/Christina-Applegate.jpg"],
      });
  }
});

client.on("interactionCreate", async (interaction) => {});

client.login(process.env.TOKEN);
