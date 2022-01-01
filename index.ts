import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import mongoose from 'mongoose'
import path from 'path'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.DIRECT_MESSAGES,
        ]

})

const vglogo = client.emojis.cache.get("926826644965060608");

client.on('ready', async () => { 

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        botOwners: ['409267472223698944','815265779708198942'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        },
        testServers: ['869692646048804944'],
        ignoreBots: true,
        
    })
    .setDefaultPrefix('s!')
    .setCategorySettings([
        {
            name: 'Moderation',
            emoji: '🛡️',
        },
        {
            name: 'Configuration',
            emoji: '⚙️'
        },
        {
            name: 'Vicegram',
            emoji: '<:VicegramWhiteLogo:926646804588671046>' 
        },
        {
            name: 'Testing',
            emoji: '<:testingicon:926828643823534110>'
        }
    ])
})

client.on("ready", () => {
    client.user?.setPresence({
        activities: [{ 
          name: `Over ${client.guilds.cache.size} servers!`,
          type: "WATCHING"
        }],
        status: "online"
    })
})

client.login(process.env.TOKEN)