const Discord = require("discord.js");
const Token = require("token.js");
const token = new token();
const client = new Discord.Client();

client.login(token);
