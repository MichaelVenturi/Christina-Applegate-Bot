module.exports = (client, message) => {
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
  console.log(client.shoutoutFreq);
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
        client.shoutoutFreq = parseInt(args[1]);
        message.channel.send(
          `shoutout frequency set to 1 / ${client.shoutoutFreq}`
        );
      }
  }
};
