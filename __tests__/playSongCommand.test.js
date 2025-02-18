const playSong = require("../commands/utility/playSong.js");

test("playSong command responds with Plays song from link", async () => {
  const mockInteraction = {
    commandName: "play",
    reply: jest.fn(),
  };

  await playSong.execute(mockInteraction);
  expect(mockInteraction.reply).toHaveBeenCalledWith("Song");
});
