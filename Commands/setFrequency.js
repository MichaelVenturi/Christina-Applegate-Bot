const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_frequency")
    .setDescription("Sets how often random shoutouts are given")
    .addIntegerOption((option) =>
      option
        .setName("input")
        .setDescription("Set frequency of random shoutouts")
        .setMinValue(0)
        .setRequired(true)
    ),
  async execute(interaction) {
    const freq = interaction.options.getInteger("input");
    interaction.client.shoutoutFreq = freq;
    await interaction.reply(`shoutout frequency set to 1 / ${freq}`);
  },
};
