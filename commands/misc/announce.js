    const Discord = require('discord.js');
    const { Command } = require('discord.js-commando');
module.exports = class AnnounceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'announce',
			aliases: ['announce'],
			group: 'misc',
			memberName: 'announce',
			description: 'Announcement.',
		});
	}
   async run(message, client) {
       const { guild, channel } = message;
       const { prefix,
               AnnounceChannel,
            } = require('../../config.json');
       const Ch = message.guild.channels.cache.find(ch => ch.name === AnnounceChannel);
       const Discord = require('discord.js')
       const user = message.member.user;
       const member = guild.members.cache.get(user.id)
       const args = message.content.slice(prefix.length).trim().split(/ +/);
       let say = args.join(" ").slice(8);
       if (say.length < 1) return message.reply('what is the message???')

       if (!message.member.hasPermission("MANAGE\_MEMBERS")) {
			return message.reply('I am unable to announce this.');
		}
            message.delete();
       const announce = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Announcement')
	.setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ format: "png", dynamic: true })}`)
	.setDescription(`${say}`)
	.setTimestamp()
	.setFooter('Thank You');
    await Ch.send(announce);
    await Ch.send('@everyone')

	}
};
