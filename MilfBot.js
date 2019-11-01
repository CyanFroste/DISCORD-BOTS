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
        // anime-lists text 638749451758075904
        // hentai-list text 638756666279591936
        // manga-list text 639117212052881449
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

    if (primaryCommand === "help"){
        helpCommand(arguments, receivedMessage)
    }
    if (primaryCommand === "suggestAnime"){
        var animeList = client.channels.get("638749451758075904")
        suggest(animeList, receivedMessage)
    }
    if (primaryCommand === "suggestManga"){
        var mangaList = client.channels.get("639117212052881449")
        suggest(mangaList, receivedMessage)
    }
    
}

function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("Help with what? Little boy")
    }else{
        receivedMessage.channel.send("THE BATH IS READY!")
    }
}

function suggest(List, receivedMessage){
      
    List.fetchMessages().then( msgs => { // Get messages to check

    let msglog = msgs.array() // Make an array with all the messages fetched  
    // Randomize the Array of content          
    let rand = msglog[Math.floor(Math.random() * msglog.length)]
    receivedMessage.channel.send(rand.content)
    })
}

// THE BOT'S TOKEN 
client.login("NjM5NDg0MjUzODU1NDE2MzUx.XbwRlg.-MCknw6KXIkelD3jycCTooqD5IM")
