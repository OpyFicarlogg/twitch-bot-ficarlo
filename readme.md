
## Tutoq
https://www.section.io/engineering-education/build-a-twitch-chatbot-in-nodejs/

https://www.twilio.com/blog/creating-twitch-chat-bots-with-node-js

https://spacejelly.dev/posts/how-to-create-a-twitch-chat-bot-with-node-js-tmi-js-heroku/

#### Get oauth token : 
https://twitchapps.com/tmi/#access_token=dhtf4tb5n2cgdy5savb5tje5mspjh7&scope=chat%3Aread+chat%3Aedit+channel%3Amoderate+whispers%3Aread+whispers%3Aedit+channel_editor&token_type=bearer

delete les messages 
https://stackoverflow.com/questions/58507346/how-can-i-delete-twitch-message-single-message-without-timeout-tmi-js#:~:text=You're%20not%20able%20to,the%20messages%20specifically%20using%20client.

#### Docs 
event doc 
https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md

https://tmijs.com/#getting-started






https://seanmcgary.com/posts/deploying-nodejs-applications-with-systemd

sudo nano /etc/systemd/system/twitchBot.service
    [Unit]  
    Description=twitch bot 
    [Service]  
    WorkingDirectory=/home/ubuntu/twitch-bot-ficarlo 
    ExecStart=npm run start
    Restart=always  
    RestartSec=10  
    SyslogIdentifier=netcore-demo  
    User=www-data  
    Environment=ASPNETCORE_ENVIRONMENT=Production  
    [Install]  
    WantedBy=multi-user.target


npm i --save-dev @types/tmi.js
npm install mongoose --save
npm install --save @typegoose/typegoose


db.createUser(
  {
    user: "twitchAdmin",
    pwd: "3C&gt:GMEKW{/{WW",
    roles: [ { role: "readWrite", db: "twitch" },{ role: "dbAdmin", db: "twitch"} ]
  }
)


this.findOne({name: username}).exec((err, user : HydratedDocument<User>| null)=> {
  if (err) {
    console.log('error:' + err)
  } 
  else {
    //...
  }
})

voir les logs:
journalctl -f -u node-server.service
