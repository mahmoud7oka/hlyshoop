setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60); 

////////////////////////////////////
////////
        ////////
                ////////
                         ////////
                                 ///////
                          ////////
                 /////////
       /////////
///////
/////////////////////////////////////

const { MessageButton, MessageEmbed, MessageActionRow, MessageAttachment } = require("discord.js");
const Canvas = require('canvas');
const fs = require('fs');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('server started')
});

app.listen(3000, () =>{('7oka');
});

const Discord = require('discord.js')
const client = new Discord.Client({
intents: 32767
})




client.on("ready", () => {
  console.log(client.user.tag)
    client.user.setPresence({
        status: 'dnd',//idle|online|dnd
        activities: [{
            name: `Hollywood S`,
            type: "STREAMING", url: "https://www.twitch.tv/7oka"
        }]
    })
})    
/////////////////////////////
  

const prefix = "-"


/////////////////////////////









///////////////خط تلقائي////////////////

const m3ath = "https://media.discordapp.net/attachments/1004816219599278091/1039484393623924736/621822300421095492.gif"
client.on("messageCreate", M3ATH => {
if(!["399864383276056577","1004816162112151673","1004816176490217513","1005104215359750194","1046776503326736404","1046776529331425382","1046776557911416872","1008387440106553384","1046776322900369448","1046776362221973545","1046776393314336768","1005213263115583548","1046776451275444244","1046776421302943754"].includes(M3ATH.channel.id)) return;
if(M3ATH.author.bot) return;
M3ATH.channel.send(m3ath)
}) 

///////////////////////////////////////





//////////////خط بـأمر//////////////
/*client.on("messageCreate", message => {
  var cmd = message.content.split(' ')[0]
  
  if(cmd == prefix + "line" || cmd ==  prefix + "خط" || cmd == "line" || cmd == "خط") {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`** :rolling_eyes: You don't have permissions **`)
    
    message.delete();
    
    message.channel.send({files: ["https://media.discordapp.net/attachments/1004816219599278091/1038027880246038619/621822300421095492.gif"]});
  }
}); */
//////////////////////////////////////





///////////////كلمات ممنوعة/////////////

client.on(`messageCreate`, async (message) => {
    let blacklistwords = ["سعر","اسعار","أسعار","عير","مشتري","بيع","بائع","بياع","اشتري","شتري","شراء","متجر","شوب","توكن","توكـ-ـن","زب","امك","أمك","قحب","كسم","قحبة","كلب","حقير","حيوان","أختك","ختك","نيك","وكن"]
    for(i in blacklistwords) {
        if(message.content.includes(blacklistwords[i])) {
           let ms = await message.reply({content: '> **هذه ألكلمات ممنوعة ولايمـكنك ذكرها**، __قم بالتشفير__'})
            message.delete()
    setTimeout(() => { if (message.author.bot) return;
    
if(ms) {
    ms.delete()
}
    }, 5000);
        }
    }
})

////////////////آراء مطور/////////////////

let config = {
    guldID: "1158801078511480952",
    channelID: "1004816207934918676",
    line: "https://media.discordapp.net/attachments/1004816219599278091/1038027880246038619/621822300421095492.gif"
}
let { guildID, channelID, line } = config
client.on("messageCreate", async message => {
    if (message.author.bot) return;
  if(!channelID.includes(message.channel.id)) return;
     message.delete();
     let embed = new Discord.MessageEmbed()
    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic:true})})
     .setColor("Black")
     .setDescription(message.content)
     message.channel.send({embeds: [embed] }).then(m => {
       m.react(["<a:LnP_Heart:1015711448539873391>","<a:LnP_Sparkles:1015648715316412579>"])
       m.channel.send(line)
     });
});  


///////////////////////////////////////




//////////////رومات مؤقتة مطور//////////////


const db = require('pro.db')
const ms = require('ms')
client.on('messageCreate', async message => {
  if(message.content.startsWith(prefix + 'set-c')) {
let category = message.content.split(" ").slice(1).join(" ")
    if(!category) return message.reply({content:`**⚠️Error: يرجى اضافة ايدي الكاتجوري**`}) 
  db.set(`category_${message.guild.id}`, category)
message.channel.send({content:`**✅Done: تم ألاضافة بنجاح**`}) 
}
  if(message.content.startsWith(prefix + 'rc')) {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({contet:`**⚠️Error: ليس لديك صلاحية**`}) 
  let category = db.get(`category_${message.guild.id}`)
  let user = message.mentions.members.first();
  if(!user)return message.reply({content: '> **منشن الشخص**'}); 
  let man = message.author.id
  let time = message.content.split(" ")
  if(!time)return message.reply({content: '> **حدد وقت للروم**'});
message.reply({content: `> **تم انشاء الروم \`${user.user.username}-room\`**`}) 
  let everyone = message.guild.roles.cache.find(role => role.name === '@everyone');
    message.guild.channels.create(`➠・${user.user.username}・Shop`,{type: 'GUILD_TEXT', parent:category}).then(message =>{
let embed = new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
    .setTitle(message.guild.name)
    .addField(`**صـاحب الـروم :**`, `${user}`, false)
    .addField(`**منـشـاءالـروم :**`,`<@${man}>`)
    .addField(`**يـنـتـهـي فـي : **`,`${time[2]}`)
    .addField(`**صـنـع فـي :**
`,`<t:${parseInt(message.createdAt / 1000)}:d>`,false)
    .setColor("Black") 
    message.send({embeds:[embed]})
    message.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true, MENTION_EVERYONE: true});
    message.permissionOverwrites.edit(everyone, { VIEW_CHANNEL: true,SEND_MESSAGES: false }).then(setTimeout(() => {
      message.delete();
    }, ms(time[2])))
})
}
})

//////////////////////////////////////








/////////////////طلبات////////////////
const channelId = "1243118193707581474";
const roleId = "1243537900961009687";
client.on("messageCreate", message => {
    if(message.content.startsWith(prefix+"طلب")) {
        const args = message.content.split(' ').slice(1).join(' ');
        if(!message.channel.id.includes(channelId)) return;
      message.delete().then(() => {
        message.channel.send(`تم ارسال طلبك ${message.author}`).then(messages => {
            setTimeout(() => {
                messages.delete()
            }, 3000)
        }) })
        client.channels.cache.get("1243118195699880008").send({content:`${message.guild.roles.cache.get(roleId)}\nطلب من: ${message.author}`,embeds:[new MessageEmbed().setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})}).setTitle("طلب جديد!").setTimestamp().setFooter({text:message.author.username,iconURL:message.author.avatarURL({dynamic:true})}).setDescription(args)]}).then(line => {
            line.channel.send({files:["/home/runner/LvSdollar-Shopdollar-Sdollar-V13/line.gif"]})
        })
    }
})
////////////////////////////////////






////////////////ضرايب////////////////
client.on("messageCreate", async message => {
    if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + "tax".toLowerCase())) { 
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" "); 
    if(!args) return message.reply("**:rolling_eyes: Please enter a number**").catch((err) => {
   console.log(err.message)
   });
    
if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
    let args2 = parseInt(args)
    let tax = Math.floor(args2 * (20) / (19) + (1))
    let tax2 = Math.floor(args2 * (20) / (19) + (1)-(args2))
    
let embed = new Discord.MessageEmbed()
      
.setAuthor(`TAX CALCULATOR`, client.user.avatarURL({ dynamic: true }))

   .setThumbnail(client.user.avatarURL({ dynamic: true }))   
      
.addFields([
    {
    name: `Amount: `,
    value: `${tax}`
},
  {
    name: `Tax: `, 
    value: `${tax2}`
  }
])
        .setColor(message.guild.me.displayColor)
  .setTimestamp()
    
   message.reply({embeds: [embed]}).catch((err) => {
   console.log(err.message)
   });    
  }
});  
/////////////////////////////////////





/////////////استدعاء - نداء//////////////
client.on('messageCreate', message => {
    if (message.content.startsWith(prefix + 'come')) {
if(!message.member.roles.cache.has('1243117940581208074')) return message.reply("** 😕 You don't have permissions **");
        let member = message.mentions.users.first()
        let channel = message.channel;
        if(!member) return message.reply('Please Mention To User !')
        let embed = new Discord.MessageEmbed()
        member.send(`> ** عذرا ${member}**\n\n> **تم استدعائك في${channel}**`)

        let embed2 = new Discord.MessageEmbed()
        .setDescription(`> **تم ألارسال ألى ${member}.**
                    
                         > **يرجى حضورك!**`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(`Dev By 7oka`)
        message.channel.send({embeds:[embed2]})
    }
});   

///////////////////////////////////////


/////////////ساي يدعم صور/////////////
client.on("messageCreate", async message => {
if (message.author.bot) return;
if (!message.channel.guild) return;
if (message.content.startsWith(prefix + 'say')) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
  return message.reply("** 😕 You don't have permissions **"); 
}
if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
  return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
}
let args = message.content.split(' ').slice(2).join(' ')
let argss = message.content.split(' ')
		let channel = message.mentions.channels.first() || message.guild.channels.cache.get(argss[1])
        let attach = message.attachments.first()
		if (!channel) return message.channel.send('** 😕 Please mention channel or id **');
		if (!args) return message.channel.send('** ❌ Please select a message **');
        message.delete()
      if (!attach) {
		channel.send({content: `${args}`});
} else {
		channel.send({content: `${args}`, files: [attach]});
}
    }
}) 

////////////////////////////////////////




//////////////ارسال للخاص///////////////
client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'send')) {
      
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`** :rolling_eyes: You don't have permissions **`)
      
let id = message.content.split(' ')[1]
      
let user = message.mentions.members.first() || message.guild.members.cache.get(id)
      
let argss = message.content.split(' ').slice(2).join(' ')
if (!user) return message.channel.send(`**:rolling_eyes: Please mention member or id **`)


if (!argss) return message.channel.send(`**:x: Please send something **`)

let attach = message.attachments.first()
if (attach) {


    user.send({content: argss, files: [attach]}).then(m => {
        message.channel.send(`**:white_check_mark: Done message sent **`)
    }).catch(err => {
        return message.channel.send(`**:x: Can't send message to this user**`)
    })
} else {
    user.send(argss).then(m => {
        message.channel.send(`**:white_check_mark: Done message sent **`)
    }).catch(err => {
        return message.channel.send(`**:x: Can't send message to this user**`)
    })
      }
    }
}) 

//////////////////////////////////////




////////////////عجلة حض////////////////
let allowedRole = '1004816054045917206' // ايدي الرتبه اللي تقدر تعمل سبن
let nothing = ['10K', 
               '20K',
               '35K', 
               '50K',
               'Ghost S',
               '75K',
               '20K',
               'حض أوفر'];
 
client.on('messageCreate', message => { 
if (message.content.startsWith(prefix + "spin")) {
  if (!message.guild) return;
if (message.member.roles.cache.find(role => role.id === allowedRole)) {
        let user = message.mentions.members.first()
        if (!user) return message.channel.send(`❌ please mention a member : ${prefix}spin @user`)


let embed = new MessageEmbed()
    .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL({ dynamic: true }))
           .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(` 🎉 مـبروك يـا  ${user} فـزت في : ${nothing[Math.floor(Math.random() * nothing.length)]} `)
          .setTimestamp()
        .setColor('RANDOM')
        

message.channel.send({embeds: [embed]})

}
}

}); 

///////////////////////////////////////




//////////////معلومات البيع//////////////



//////////////////////////////////////


/////////////رد تلقائي للتقييم/////////////
client.on('messageCreate', sasoky => {
  if (sasoky.content === 'قيم') {
    sasoky.reply({ content: ` شكرا لااختيارك خدمتنا، رأيك يهمني
> <#1243118207611572336>` })
  }
})
/////////////////////////////////////






    










      
client.login(process.env.token)