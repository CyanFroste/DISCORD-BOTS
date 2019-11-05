const Discord = require('discord.js')
const client = new Discord.Client()

var fs = require("fs")
var text = fs.readFileSync("./responses.txt").toString()
var responseArray = text.split("\n")
text = fs.readFileSync("./commands.txt").toString()
var commands = text

var TOKEN = "NjM5NDg0MjUzODU1NDE2MzUx.XcFuyA.5Ylhbg1Y3A_byYEziwNkCsjtn7I"

function processCommand(receivedMessage) {
    
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")

    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand === "help"){
        helpCommand(arguments, receivedMessage)
    }

    if (primaryCommand === "ping"){
        botLatency(receivedMessage)
    }

    if (primaryCommand === "uptime"){
        botUptime(receivedMessage)
    }

    if (primaryCommand === "anime"){
        var animeList = client.channels.get("638749451758075904")
        suggest(animeList, receivedMessage, arguments)
    }

    if (primaryCommand === "manga"){
        var mangaList = client.channels.get("639117212052881449")
        suggest(mangaList, receivedMessage, arguments)
    }

    if (primaryCommand === "hentai"){
        var hentaiList = client.channels.get("638756666279591936")
        suggest(hentaiList, receivedMessage, arguments)
        setTimeout(function(){receivedMessage.channel.send("But, why Hentai when you have me...? :cry: *sad noises*")}, 2000)
    }    

    if (primaryCommand === "clearEarlyChatBy"){
        deleteEarlyMessages(receivedMessage, arguments)
    }

    if (primaryCommand == "invite"){
        inviteViaBot(receivedMessage, arguments)
    }
}

function deleteEarlyMessages(receivedMessage, arguments){
    if (arguments.length == 0){
        receivedMessage.channel.send("We aren't deleting our lewd little conversation, Darling!").then(msg => msg.delete(4000))
    }else{

        if (receivedMessage.channel.id.toString() === "638749451758075904" || receivedMessage.channel.id.toString() === "639117212052881449" || receivedMessage.channel.id.toString() === "638756666279591936"){
            return
        }else{
            receivedMessage.channel.bulkDelete(parseInt(arguments[0])).then(() => {
            receivedMessage.channel.send("I've deleted our lewd little conversation, Darling! :smirk: ").then(msg => msg.delete(4000))
            })
        }
    }
}

function botUptime(receivedMessage){
    let totalSeconds = (client.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    let uptime = `I've been alive for \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds :persevere: `
    receivedMessage.channel.send(uptime).then( msg => {
        msg.delete(4000)
        receivedMessage.delete(4000)
    })
}


function botLatency(receivedMessage){
    receivedMessage.channel.send("Pinging...").then( msg => {
        let ping = msg.createdTimestamp - receivedMessage.createdTimestamp
        msg.edit(`\`${ping}\`ms ~Boing!`)
        msg.delete(4000)
        receivedMessage.delete(4000)
    })
   
}


function inviteViaBot(receivedMessage, arguments){
    if (arguments.length == 0){
        receivedMessage.channel.send("Who do I invite now? *sadface*").then(msg => msg.delete(4000))
    }else{
        if (arguments[0].toLowerCase() === "all"){
            receivedMessage.guild.members.forEach(member => {
                if (member.id != client.user.id && !member.user.bot && member.id != receivedMessage.member.id )
                    member.send("Come have fun with me, Darling!" + "   @" + receivedMessage.guild.name.toString()) //.then(msg => msg.delete(3000))
            })
        }else{            
            let ID = receivedMessage.mentions.users.first().id
            if (ID === client.user.id.toString() ){
                return
            }
            client.users.get(ID).send("Come have fun with me, Darling!" + "   @" + receivedMessage.guild.name.toString()) //.then(msg => msg.delete(3000))
        }
    }
}

function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("Tell me what you need, Sugar!")
    }
    if (arguments[0] === "commands"){
        receivedMessage.channel.send(commands)
    }   
}

function suggest(List, receivedMessage, arguments){
    if (arguments.length == 0){  
        List.fetchMessages().then( msgs => { // Get messages to check

            let msglog = msgs.array() // Make an array with all the messages fetched  
            // Randomize the Array of content          
            let rand = msglog[Math.floor(Math.random() * msglog.length)]
            receivedMessage.channel.send("Ora~ Look What I found!\n")
            receivedMessage.channel.send(rand.content)            
        })
    }else{
        let genre = arguments[0].toLowerCase()
        List.fetchMessages().then( msgs => { // Get messages to check

            let msglog = msgs.array() 
            var msglogContent = []
            for(var i in msglog){
                if(msglog[i].content.toLowerCase().includes(genre)){               
                    
                    msglogContent.push(msglog[i].content)
                }              
            }
            if(msglogContent.length == 0){
                receivedMessage.channel.send("Ara! Ara! looks like no such genre exist, dear.").then(msg => {msg.delete(4000)})
            }else{
                let rand = msglogContent[Math.floor(Math.random() * msglogContent.length)]
            receivedMessage.channel.send("Ora~ Look What I found!\n")    
            receivedMessage.channel.send(rand) //.then(msg=> {msg.delete(14000)})            
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
        if (matchLink.includes(postLink)){
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
    try{
        if (receivedMessage.content.toUpperCase().includes('NEE SAN') || receivedMessage.mentions.users.first().id === client.user.id.toString() ){
            let tempResponseArray = []
            let responses = ["Ara! Ara! " + receivedMessage.author.toString() + " kun!", "I was feelin' so lonely " + receivedMessage.author.toString() + " kun!"]
            tempResponseArray = responseArray.concat(responses)
            // console.log(tempResponseArray)
            let randomResponse = tempResponseArray[Math.floor(Math.random() * tempResponseArray.length)]
            
            receivedMessage.channel.send(randomResponse)
            receivedMessage.react("❤")
            
            
        }    
    }catch(error){
        // console.log("It wasn't for me...")        
    }

    if (receivedMessage.content.startsWith("!")) {  
        processCommand(receivedMessage)
    }
    
    if (receivedMessage.channel.id.toString() == "638749451758075904" || receivedMessage.channel.id.toString() == "639117212052881449" || receivedMessage.channel.id.toString() == "638756666279591936"){
        receivedMessage.channel.fetchMessages().then( msgs => { 
            var msglog = msgs.array()
            msglog = msglog.slice(1)
            let dupeCheck = checkEarlierPostLink(receivedMessage, msglog)    
            if(dupeCheck){
                receivedMessage.delete()
                receivedMessage.channel.send("Ara! Ara! Seems like the post already exist or the post's format is incorrect!").then( botMsg =>{ botMsg.delete(4000) } )
            }
        }) 
    }
})

// THE BOT'S TOKEN 
client.login(TOKEN)
