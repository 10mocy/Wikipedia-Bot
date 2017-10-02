/* eslint no-console: ['error', { allow: ['log'] }] */

const Discord = require('discord.js');
const wikipedia = require('./wikipedia.js');
const token = require('./token.js');

const client = new Discord.Client();

const writeLog = (title, detail) => {
  console.log(`-----\n${title}\n\n    ${detail}\n`);
};

const sendMessage = (channel, message, suffix) => {
  writeLog('メッセージ送信', `${message} ---> ${suffix}`);
  channel.send(message);
};

client.login(token.discord);
client.on('ready', () => {
  writeLog('システム', '準備が整いました。');
});

client.on('message', (message) => {
  let sender;
  let suffix;

  if (message.channel.type === 'dm') {
    sender = message.channel.lastMessage.author;
    suffix = `${sender.tag}(ダイレクトメッセージ)`;
  } else if (message.channel.type === 'text') {
    sender = message.member;
    suffix = `${sender.tag}(#${message.channel.name} << ${message.guild.name})`;
  }

  if (sender.id !== '356430678684073986') {
    writeLog('メッセージ受信', `${message.channel.content} <--- ${suffix}`);

    const sToha = /^(.*)#とは$/;
    const mToha = /^(.*)\s#とは$/;

    if (sToha.test(message.content)) {
      const messagetext = message.content.match(mToha);
      if (1 in messagetext) {
        const word = messagetext[1];
        const search = wikipedia.search(word);
        let result;

        if (search !== null) {
          writeLog('Wikipedia', `「${word}」のWikipediaページが見つかりました。`);
          result = {
            embed: {
              title: `「${word}」の定義`,
              description: `${search}。`,
              url: `https://ja.wikipedia.org/wiki/${encodeURIComponent(word)}`,
            },
          };
        } else {
          writeLog('Wikipedia', `Wikipediaに「${word}」というページは存在しません。`);
          result = {
            embed: {
              title: `Wikipediaに「${word}」というページは存在しません。`,
              color: 16726072,
            },
          };
        }

        sendMessage(message.channel, result);
      }
    }
  }
});

// never used(yet).
/*
const replace = (source, replacers) => {
  let replaced = source;
  for (const replacer of replacers) {
    replaced = replaced.replace(replacer[0], replacer[1]);
  }
  return replaced;
};
*/
