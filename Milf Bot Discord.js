const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity('YouTube', {type: "WATCHING"})

    /*
    // TO FIND A SERVER'S CHANNEL DETAILS
    client.guilds.forEach((guild) => {
        console.log(guild.name)
        guild.channels.forEach((channel) =>{
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        }) 
        // bot-test text 639498032928260116
    })
    */
  
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user){
        return
    }
    if (receivedMessage.content.toUpperCase().includes('ONEE SAN')){
        receivedMessage.channel.send("Ara! Ara! " + receivedMessage.author.toString() + " kun")
        // receivedMessage.react("❤")
    }    
    if (receivedMessage.content.startsWith("!")) {  
        processCommand(receivedMessage)
    }
    
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")

    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "help"){
        helpCommand(arguments, receivedMessage)
    }
}

function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("Help with what? Little boy")
    }else{
        receivedMessage.channel.send("THE BATH IS READY!")
    }
}
// THE BOT'S TOKEN 
client.login("token string here")
