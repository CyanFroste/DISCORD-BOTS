const Discord = require('discord.js')
const client = new Discord.Client()



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

    if (primaryCommand === "clearEarlyChat"){
        if (receivedMessage.channel.id.toString() == "638749451758075904" || receivedMessage.channel.id.toString() == "639117212052881449"){
            return
        }else{
            receivedMessage.channel.bulkDelete(20).then(() => {
            receivedMessage.channel.send("I've deleted our little lewd chat, Darling! *wink* *wink*").then(msg => msg.delete(3000))
            })
        }
    }

    if (primaryCommand == "inviteEveryoneOver"){
        receivedMessage.guild.members.forEach(member => {
            if (member.id != client.user.id && !member.user.bot) member.send("Come Over Bois");
        });
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

// function to check duplicate message
function checkEarlierPostLink(receivedMsg, array) { 

    let fullPostArray = receivedMsg.content.split(" ")
    let postLink = fullPostArray[fullPostArray.length - 1]    
    postLink = postLink.slice(postLink.indexOf("https"))  
    // console.log(postLink)
    let count = 0
    for (var temp in array) {  
        // console.log(array[temp].content)   
        
        let catalogArray = array[temp].content.split(" ")
        let matchLink = catalogArray[catalogArray.length - 1]
        matchLink = matchLink.slice(matchLink.indexOf("https"))
        // console.log(matchLink)
        if (postLink === matchLink){
            // receivedMsg.channel.send("Ara! Ara! Post already exists!")                
            count++
        }  
    } 
    if(count == 0)
        return false
    else
        return true
}


client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("with Myself")
    // client.user.setActivity('YouTube', {type: "WATCHING"})

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
    
    // To prevent Bot from replying to itself and fuck up in a loop
    if (receivedMessage.author == client.user){
        return
    }
    
    if (receivedMessage.content.toUpperCase().includes('ONEE SAN')){
        var responses = ["Ara! Ara! " + receivedMessage.author.toString() + " kun!", "~Damee!!!", "Come to mama~ let me succ you dry!", "I'm so lonely " + receivedMessage.author.toString() + " kun!"]

        let randomResponse = responses[Math.floor(Math.random() * responses.length)]
        receivedMessage.channel.send(randomResponse)
        // receivedMessage.react("❤")
    }    
    
    if (receivedMessage.content.startsWith("!")) {  
        processCommand(receivedMessage)
    }
    
    if (receivedMessage.channel.id.toString() == "638749451758075904" || receivedMessage.channel.id.toString() == "639117212052881449"){
        receivedMessage.channel.fetchMessages().then( msgs => { 
            var msglog = msgs.array()
            msglog = msglog.slice(1)
            let dupeCheck = checkEarlierPostLink(receivedMessage, msglog)    
            if(dupeCheck){
                receivedMessage.delete()
                receivedMessage.channel.send("Ara! Ara! Seems like the post already exist!").then( botMsg =>{ botMsg.delete(3000) } )
            }
        }) 
    }
})

// THE BOT'S TOKEN 
client.login("NjM5NDg0MjUzODU1NDE2MzUx.Xbw2Fw.TDiWnHf-SFDEWLs1iS0r3FlhKoo")
