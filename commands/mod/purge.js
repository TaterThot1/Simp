    const { Command } = require('discord.js-commando');
module.exports = class PurgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			aliases: ['purge'],
			group: 'mod',
			memberName: 'purge',
			description: 'delete messages in chat.',
		});
	}
	async run (message) {
        const { MainLogName } = require('../../config.json');
        const log = message.guild.channels.cache.find(ch => ch.name === MainLogName);
		const mod = message.member.user;
		const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(error) {
			return message.reply('Please provide the number of messages to delete. (max 100)');
		}
        
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.reply('You dont have the correct perms to use this command');
		}
		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Specify an amount, between 2 and 100, to delete.');
        const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Messages where not deleted: ${error}`));
        return message.reply(`purged ${deleteCount} messages`)
	.then(() => log.send({embed: {color: '#FF0000', title: 'Message Log', description: `${deleteCount} messages purged in ${message.channel} by ${mod}.`}}));
	}
};
