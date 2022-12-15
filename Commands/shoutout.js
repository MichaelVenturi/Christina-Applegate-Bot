const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shoutout")
    .setDescription("Gives a shoutout to Christina Applegate"),
  async execute(interaction) {
    await interaction.reply("test");
  },
};
