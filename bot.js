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

client.on("messageCreate", async (msg) => {
  if (msg.channelId != "1035962218715558028") return;
  if (msg.author.bot) return;

  const content = msg.content;

  if (content.includes("```")) {
    const sections = createSections(content);

    msg.reply(sections.map((s) => s.content).join("```"));
  }
});

client.login(process.env.BOT_TOKEN);
