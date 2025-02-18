const ping = require("../commands/utility/ping.js");

test("ping command responds with Pong", async () => {
  const mockInteraction = {
    commandName: "ping",
    reply: jest.fn(),
  };

  await ping.execute(mockInteraction);
  expect(mockInteraction.reply).toHaveBeenCalledWith("Pong!");
});
