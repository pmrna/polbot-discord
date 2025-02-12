const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays song from link."),

  async execute(interaction) {
    await interaction.reply("Song");
  },
};
