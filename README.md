# Discord Private Group Chat Bot

This is a bot that can mass create private text channels for certain members within a server.

### Requirements

- node.js
- discord.js
    - `npm install discord.js --save`

### Usage
1.  Edit the `groups.json` file as needed. It is important to note that the format for the members must be: **username#1234**. No spaces after or before the #.
    > It is important that you use the username of a user and not the nickname in the server.

2. Replace the token variable in `./config.json` with the token of your own discord application.
 
3. You can add your discord application by following the instructions in the [discordjs documentation](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links). 

4. After that, simply type `node groupchatbot.js` to start your application. Use `!groups` in discord to start creating groups and roles. 
