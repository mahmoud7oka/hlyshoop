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

/////////////نظام البروفايل/////////////
const OWNER_ID = '862387695836725248';
const creditsPath = './credits.json';
let credits = {};

if (fs.existsSync(creditsPath)) {
  try {
    credits = JSON.parse(fs.readFileSync(creditsPath));
  } catch (e) {
    console.error('Error loading credits.json:', e);
    credits = {};
  }
} else {
  credits = {};
}

function saveCredits() {
  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRequiredXP(level) {
  const xpMap = {
    20: 6944,
    21: 1856 + 6944,
    22: 2156 + 8800,
    23: 2300 + 10956,
    24: 2500 + 13256,
    25: 2700 + 15756,
    26: 2900 + 18456,
    27: 3100 + 21356,
    28: 3300 + 24456,
    29: 3500 + 27756,
    30: 3700 + 31256,
    31: 3900 + 34956,
    32: 4100 + 38856,
    33: 4300 + 42956,
    34: 4500 + 47256,
    35: 4700 + 51756,
    36: 4900 + 56456,
    37: 5100 + 61356,
    38: 5300 + 66456,
    39: 5500 + 71756,
    40: 5700 + 77256,
    41: 5900 + 82956,
    42: 6100 + 88856,
    43: 6300 + 94956,
    44: 6500 + 101256,
    45: 6700 + 107756,
    46: 6900 + 114456,
    47: 7100 + 121356,
    48: 7300 + 128456,
    49: 7500 + 135756,
    50: 7700 + 143256,
    51: 7900 + 150956,
    52: 8100 + 158856,
    53: 8300 + 166956,
    54: 8500 + 175256,
    55: 8700 + 183756,
    56: 8900 + 192456,
    57: 9100 + 201356,
    58: 9300 + 210456,
    59: 9500 + 219756,
    60: 9700 + 229256,
  };

  if (level > 60) {
    return 9700 + (level - 60) * 200;
  }

  return xpMap[level] || 6944;
}

function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

function isOwner(userId) {
  return userId === OWNER_ID;
}

function getLastRank() {
  let lastRank = 0;
  for (const userId in credits) {
    if (credits[userId].rank > lastRank) {
      lastRank = credits[userId].rank;
    }
  }
  return lastRank;
}

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  
  let targetUser = message.author;
  if (!credits[targetUser.id]) {
    const lvl = getRandomInt(20, 75);
    credits[targetUser.id] = {
      level: lvl,
      rep: 0,
      credits: getRandomInt(500, 2000),
      rank: getLastRank() == 0 ? 1 : getLastRank() + 1,
      totalXP: 0,
      currentXP: 0,
      msgs: 0,
      requiredXP: getRequiredXP(lvl),
    };
    saveCredits();
  }

  const data = credits[targetUser.id];
  data.msgs = (data.msgs || 0) + 1;

  if (data.msgs >= 3) {
    const gainedXP = 3;
    data.currentXP = (data.currentXP || 0) + gainedXP;
    data.totalXP = (data.totalXP || 0) + gainedXP;
    data.msgs = 0;
  }

  let args, command;

  if (message.content.startsWith(prefix)) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    command = args.shift().toLowerCase();
  } else {
    args = message.content.trim().split(/ +/);
    command = args.shift()?.toLowerCase();
  }

  if (['بروفايل', 'profile', 'p'].includes(command)) {
    let target1 =
      message.mentions.users.first() ||
      (args[0] ? message.client.users.cache.get(args[0]) : null) ||
      message.author;

    let targetData = credits[target1.id] || {
      level: 33,
      rep: 0,
      credits: 1070000000,
      rank: 2714336,
      totalXP: 77347,
      currentXP: 722,
      requiredXP: 4652,
    };

    if (typeof targetData.level !== 'number' || isNaN(targetData.level)) targetData.level = 33;
    if (typeof targetData.rep !== 'number' || isNaN(targetData.rep)) targetData.rep = 0;
    if (typeof targetData.credits !== 'number' || isNaN(targetData.credits)) targetData.credits = getRandomInt(500, 2000);
    if (typeof targetData.rank !== 'number' || isNaN(targetData.rank)) targetData.rank = getRandomInt(1, 10000000);
    if (typeof targetData.totalXP !== 'number' || isNaN(targetData.totalXP)) targetData.totalXP = 0;
    if (typeof targetData.currentXP !== 'number' || isNaN(targetData.currentXP)) targetData.currentXP = 0;
    if (typeof targetData.requiredXP !== 'number' || isNaN(targetData.requiredXP)) targetData.requiredXP = getRequiredXP(targetData.level);

    while (targetData.currentXP >= targetData.requiredXP && targetData.level < 60) {
      targetData.currentXP -= targetData.requiredXP;
      targetData.level++;
      targetData.requiredXP = getRequiredXP(targetData.level);
    }

    // إنشاء الكانفاس
    const canvas = Canvas.createCanvas(400, 600);
    const ctx = canvas.getContext('2d');

    // رسم الخلفية المتدرجة
    const gradient = ctx.createLinearGradient(0, 0, 400, 600);
    gradient.addColorStop(0, '#8B5CF6');    // بنفسجي فاتح
    gradient.addColorStop(0.3, '#A855F7');  // بنفسجي متوسط
    gradient.addColorStop(0.6, '#7C3AED');  // بنفسجي
    gradient.addColorStop(1, '#5B21B6');    // بنفسجي غامق

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);

    // رسم الأشكال الهندسية للخلفية
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(Math.random() * 400, Math.random() * 600, Math.random() * 100, Math.random() * 100);
    }
    ctx.globalAlpha = 1;

    // رسم صورة المستخدم
    try {
      const avatar = await Canvas.loadImage(target1.displayAvatarURL({ format: 'png', size: 256 }));
      const avatarSize = 80;
      const avatarX = 30;
      const avatarY = 30;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();

      // رسم إطار حول الصورة
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2);
      ctx.stroke();
    } catch (error) {
      console.error('Error loading avatar:', error);
    }

    // رسم اسم المستخدم
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(target1.username, 130, 60);

    // رسم أيقونة السيرفر
    try {
      const serverIconURL = message.guild.iconURL({ format: 'png', size: 64 });
      if (serverIconURL) {
        const serverIcon = await Canvas.loadImage(serverIconURL);
        const iconSize = 30;
        const iconX = 350;
        const iconY = 20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(serverIcon, iconX, iconY, iconSize, iconSize);
        ctx.restore();
      }
    } catch (error) {
      console.error('Error loading server icon:', error);
    }

    // رسم معلومات المستوى والنقاط
    const startY = 150;
    const lineHeight = 80;

    // LVL
    ctx.font = '16px Arial';
    ctx.fillStyle = '#E5E7EB';
    ctx.textAlign = 'left';
    ctx.fillText('LVL', 30, startY);
    
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(targetData.level.toString(), 30, startY + 35);

    // REP
    ctx.font = '16px Arial';
    ctx.fillStyle = '#E5E7EB';
    ctx.fillText('REP', 30, startY + lineHeight);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`+${targetData.rep}`, 30, startY + lineHeight + 35);

    // CREDITS
    ctx.font = '16px Arial';
    ctx.fillStyle = '#E5E7EB';
    ctx.fillText('CREDITS', 30, startY + lineHeight * 2);
    
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(formatNumber(targetData.credits), 30, startY + lineHeight * 2 + 35);

    // RANK
    ctx.font = '16px Arial';
    ctx.fillStyle = '#E5E7EB';
    ctx.fillText('RANK', 30, startY + lineHeight * 3);
    
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(targetData.rank.toString(), 30, startY + lineHeight * 3 + 35);

    // رسم شريط التقدم في الأسفل
    const barY = 520;
    const barHeight = 40;
    const barWidth = 340;
    const barX = 30;

    // خلفية الشريط
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // الشريط المملوء
    const progress = Math.min((targetData.currentXP / targetData.requiredXP) * 100, 100);
    const filledWidth = (progress / 100) * barWidth;
    
    ctx.fillStyle = '#374151';
    ctx.fillRect(barX, barY, filledWidth, barHeight);

    // نص الشريط
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(`${targetData.currentXP} / ${targetData.requiredXP}`, barX + barWidth / 2, barY + barHeight / 2 + 5);

    // نص TOTAL XP
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#E5F2FF';
    ctx.fillText(`TOTAL XP: ${targetData.totalXP}`, barX + barWidth / 2, barY + barHeight + 20);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.png');
    message.reply({ files: [attachment] });
  }

  else if (command === 'addrep') {
    if (!isOwner(message.author.id)) return message.reply('You are not authorized to use this command.');
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to add rep.');

    if (!credits[user.id]) {
      credits[user.id] = {
        level: getRandomInt(20, 75),
        rep: 0,
        credits: getRandomInt(500, 2000),
        rank: getRandomInt(1, 10000000),
        totalXP: 0,
        currentXP: 0,
        requiredXP: getRequiredXP(20),
      };
    }
    credits[user.id].rep = (credits[user.id].rep || 0) + 1;
    saveCredits();
    message.channel.send(`Added 1 rep to ${user.username}. Total rep: ${credits[user.id].rep}`);
  }

  else if (command === 'removerep') {
    if (!isOwner(message.author.id)) return message.reply('You are not authorized to use this command.');
    const user = message.mentions.users.first();
    if (!user) return message.reply('Please mention a user to remove rep.');

    if (!credits[user.id]) {
      credits[user.id] = {
        level: getRandomInt(20, 75),
        rep: 0,
        credits: getRandomInt(500, 2000),
        rank: getRandomInt(1, 10000000),
        totalXP: 0,
        currentXP: 0,
        requiredXP: getRequiredXP(20),
      };
    }
    credits[user.id].rep = Math.max(0, (credits[user.id].rep || 0) - 1);
    saveCredits();
    message.channel.send(`Removed 1 rep from ${user.username}. Total rep: ${credits[user.id].rep}`);
  }
});

/////////////////////////////////////






    










      
client.login(process.env.token)