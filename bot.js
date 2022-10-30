require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { createSections } = require("./codeHelper");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const spawn = require("child_process").spawn;

const guessLang = async (sample) => {
  const guess = spawn("python", ["./guess.py", sample]);

  return new Promise((resolve) => {
    guess.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });
  });
};

client.on("messageCreate", async (msg) => {
  if (msg.channelId != "1035962218715558028") return;
  if (msg.author.bot) return;

  const content = msg.content;

  if (content.includes("```")) {
    const sections = await createSections(content);

    await Promise.all(
      sections
        .filter((s) => s.type == "amb_code")
        .map(async (section) => {
          section.guess = await guessLang(section);
        })
    );

    const response = sections
      .map((s) => (s.guess ? s.guess + s.content : s.content))
      .join("```");

    console.log(response);

    msg.reply(response);
  }
});

client.login(process.env.BOT_TOKEN);
