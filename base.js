const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
    // Turning the auto-update check off for NPM package
    // All Config options are linked below
    // https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
});
const config = require('./config.json');
const prefix = config.prefix;

client.on('ready', async () => {
    console.log(`Welcome ${client.user.username}!`);
});

const responses = ['Yes', 'No', 'Maybe', 'Ask again later', 'Cannot predict now', "Don't count on it", 'Certainly', 'Absolutely not'];

client.on('messageCreate', (msg) => {
    if (config.allowOthersToUse == true) {
        return;
    } else {
        if (msg.author != client.user) {
            return;
        }
    }

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd == "ping") {
        const ping = Date.now() - msg.createdTimestamp;
        msg.edit(`Pong! Latency is ${ping}ms.`);
    }

    if (cmd == "8ball") {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        msg.edit(`🎱 ${randomResponse}`);
    }
});

client.login(config.token);
