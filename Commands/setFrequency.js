const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_frequency")
    .setDescription("Sets how often random shoutouts are given"),
  async execute(interaction) {
    await interaction.reply("freq");
  },
};
