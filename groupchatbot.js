const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { groups } = require('./groups.json');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'groups') {
        if (!args.length) {
            if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
                return message.channel.send(`Sorry ${message.author}, you don't have the permissions to perform this command!`);
            }

            for (let i = 0; i < groups.length; i++) {
                let group_num = groups[i].group_num;
                const Role = await message.guild.roles.create({ // Creating the role.
                    data: {name: `Group ${group_num}`, color: "DEFAULT"}
                }).catch((e) => console.error(`Couldn't create role. | ${e}`)); // Catching for errors.

                let guild_id = message.guild.id;
                let gld = await client.guilds.fetch(guild_id);
                for (let j = 0; j < groups[i].members.length; j++) {
                    let usrname = (groups[i].members[j]).slice().trim().split('#')[0];
                    let memberMap = await gld.members.fetch({ query: usrname, limit: 3});   //querying for members with username
                    let member = memberMap.find(member => 
                        `${member.user.username}#${member.user.discriminator}` === groups[i].members[j] //must use discriminator if there are duplicate usernames
                    )
                    if (member == null) { //This means that we could not find the member
                        continue;
                    }
                    console.log(member)
                    console.log(member.user.username);
                    member.roles.add(Role).then(() => { // Adding the role to the member.
                        message.channel.send(`Role ${Role.name} has been added to ${member.user.username}`); // Sending a message if the role has been added.
                    }).catch((e) => console.error(`Couldn't add role. | ${e}`)); // Catching for errors.
                }
                let everyoneid = message.guild.id;
                message.guild.channels.create(`Group ${group_num}`, 
                {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: everyoneid,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: Role,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                .catch(console.error);
            }
        }
        else {
            return message.channel.send(`You provided too many arguments, ${message.author}!\nUsage:\n!groups`);
        }
    }
    else if (command === 'usage') {
        return message.channel.send(`Usage:\n!groups`);
    }
    else {
        return message.channel.send(`Usage:\n!groups\n!usage`);
    }
});

client.login(token);

