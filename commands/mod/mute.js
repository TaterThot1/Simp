const Client = require('../../client/Client');
const Collection = require('../../node_modules/discord.js/src/util/Collection.js');
const Discord = require('discord.js');
const getUserFromMention = require('../../util/getUser');
const { Command } = require('discord.js-commando');
module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			aliases: ['mute'],
			group: 'mod',
			memberName: 'mute',
			description: 'Mute user.',
		});
	}
    run(message, client) {
        const { prefix, MainLogName, roleName1, } = require('../../config.json');
          const log = message.guild.channels.cache.find(ch => ch.name === MainLogName);
          let member = message.mentions.members.first();
          let mute = message.guild.roles.cache.find(x => x.name === roleName1);
		if (!message.member.hasPermission("MANAGE\_MEMBERS")) {
			return message.reply('You are unable to mute this user.');
		}
          const args = message.content.slice(prefix.length).trim().split(/ +/);
       	  let reason = args.join(" ").slice(27);
     		if (reason.length < 1) return message.reply('what is the reason???');

          let ismuted = member.roles.cache.some(role => role.name === roleName1);
       		if (ismuted) return message.reply(`sorry but ${member} is already muted`);
          member.roles.set(mute)
            .then(console.log)
            .catch(console.error);
          return message.reply(`muted ${member}`)
		.then(() => log.send({embed: {color: '#FF0000', title: 'Mute Log', description: `${member} has been muted for ${reason}.`}}));
    }
};
//if @everyone has the perm to type or speak the command wont work
