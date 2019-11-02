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
        suggest(animeList, receivedMessage, arguments)
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
            receivedMessage.channel.send("I've deleted our little lewd conversation, Darling! *wink* *wink*").then(msg => msg.delete(3000))
            })
        }
    }

    if (primaryCommand == "inviteEveryoneOver"){
        receivedMessage.guild.members.forEach(member => {
            if (member.id != client.user.id && !member.user.bot && member.id != receivedMessage.member.id )
                member.send("Come over, Pumpkin!")
        })
    }
}

function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("Tell me what you need, Sugar!")
    }else{
        receivedMessage.channel.send("THE BATH IS READY, LET'S GET TO IT!")
    }
}

function suggest(List, receivedMessage, arguments){
    if (arguments.length == 0){  
        List.fetchMessages().then( msgs => { // Get messages to check

            let msglog = msgs.array() // Make an array with all the messages fetched  
            // Randomize the Array of content          
            let rand = msglog[Math.floor(Math.random() * msglog.length)]
            receivedMessage.channel.send(rand.content)
        })
    }else{
        let genre = arguments[0]
        List.fetchMessages().then( msgs => { // Get messages to check

            let msglog = msgs.array() 
            var msglogContent = []
            for(var i in msglog){
                if(msglog[i].content.includes(genre)){               
                    
                    msglogContent.push(msglog[i].content)
                }              
            }
            if(msglogContent.length == 0){
                receivedMessage.channel.send("Ara! Ara! looks like no such genre exist, dear.").then(msg => {msg.delete(2000)})
            }else{
                let rand = msglogContent[Math.floor(Math.random() * msglogContent.length)]
            receivedMessage.channel.send(rand).then(msg=> {msg.delete(14000)})
            }  
        })
    }
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
        var responses = ["Ara! Ara! " + receivedMessage.author.toString() + " kun!", "Dame!", "Come to mama~ let me succ you dry!", "I was feelin' so lonely " + receivedMessage.author.toString() + " kun!", "~Itadakimaasu!", "Sugoi kirei!", "Kimochi ii...", " Ara! Ara! **drools*"]

        let randomResponse = responses[Math.floor(Math.random() * responses.length)]
        receivedMessage.channel.send(randomResponse)
        receivedMessage.react("❤")
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
client.login("NjM5NDg0MjUzODU1NDE2MzUx.Xb2QOQ.223P0W6sUsrVeTutmq68VDvCglc")
