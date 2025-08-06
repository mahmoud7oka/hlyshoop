const OWNER_ID = '862387695836725248';
const creditsPath = './credits.json';

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
    return lastRank;
  }
}

// Helper function to create gradient
function createGradient(ctx, x, y, width, height, colors) {
  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  return gradient;
}

// Helper function to draw rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
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
      rank: getLastRank() == 0 ? 1 : getLastRank(),
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

    let member1 = message.guild.members.cache.get(target1.id);
    const data = credits[target1.id] || {};

    if (typeof data.level !== 'number' || isNaN(data.level)) data.level = 20;
    if (typeof data.rep !== 'number' || isNaN(data.rep)) data.rep = 0;
    if (typeof data.credits !== 'number' || isNaN(data.credits)) data.credits = getRandomInt(500, 2000);
    if (typeof data.rank !== 'number' || isNaN(data.rank)) data.rank = getRandomInt(1, 10000000);
    if (typeof data.totalXP !== 'number' || isNaN(data.totalXP)) data.totalXP = 0;
    if (typeof data.currentXP !== 'number' || isNaN(data.currentXP)) data.currentXP = 0;
    if (typeof data.requiredXP !== 'number' || isNaN(data.requiredXP)) data.requiredXP = getRequiredXP(data.level);

    while (data.currentXP >= data.requiredXP && data.level < 60) {
      data.currentXP -= data.requiredXP;
      data.level++;
      data.requiredXP = getRequiredXP(data.level);
    }

    // ProBot Style Canvas - 800x600
    const canvas = Canvas.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // ProBot Style Background Gradient
    const bgGradient = createGradient(ctx, 0, 0, 800, 600, [
      '#667eea', // Light purple-blue
      '#764ba2', // Purple
      '#667eea'  // Light purple-blue
    ]);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 600);

    // Background pattern overlay
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 800; i += 50) {
      for (let j = 0; j < 600; j += 50) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(i, j, 1, 1);
      }
    }
    ctx.globalAlpha = 1;

    // Main container with rounded corners
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    drawRoundedRect(ctx, 40, 40, 720, 520, 20);
    ctx.fill();

    // Avatar container - centered at top
    const avatarSize = 140;
    const avatarX = (800 - avatarSize) / 2;
    const avatarY = 80;

    // Avatar border with gradient
    const avatarBorderGradient = createGradient(ctx, avatarX - 8, avatarY - 8, avatarSize + 16, avatarSize + 16, [
      '#ffeaa7',
      '#fab1a0',
      '#fd79a8'
    ]);
    ctx.fillStyle = avatarBorderGradient;
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, (avatarSize + 16) / 2, 0, Math.PI * 2);
    ctx.fill();

    // Avatar background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, (avatarSize + 8) / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw avatar
    const avatar = await Canvas.loadImage(target1.displayAvatarURL({ format: 'png', size: 512 }));
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Username - centered below avatar
    ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText(target1.username, 400, 270);
    ctx.shadowBlur = 0;

    // Stats containers in a grid layout
    const statsY = 320;
    const statWidth = 150;
    const statHeight = 80;
    const statSpacing = 20;
    
    // Calculate positions for 4 stats in a row
    const totalStatsWidth = (statWidth * 4) + (statSpacing * 3);
    const startX = (800 - totalStatsWidth) / 2;

    const stats = [
      { label: 'المستوى', value: data.level, color: '#74b9ff' },
      { label: 'السمعة', value: `+${data.rep}`, color: '#00b894' },
      { label: 'الكريديت', value: formatNumber(data.credits), color: '#fdcb6e' },
      { label: 'الترتيب', value: `#${data.rank}`, color: '#fd79a8' }
    ];

    stats.forEach((stat, index) => {
      const x = startX + (index * (statWidth + statSpacing));
      
      // Stat container
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      drawRoundedRect(ctx, x, statsY, statWidth, statHeight, 12);
      ctx.fill();

      // Stat border
      ctx.strokeStyle = stat.color;
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, x, statsY, statWidth, statHeight, 12);
      ctx.stroke();

      // Stat label
      ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(stat.label, x + statWidth / 2, statsY + 25);

      // Stat value
      ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = stat.color;
      ctx.fillText(stat.value, x + statWidth / 2, statsY + 55);
    });

    // XP Progress Bar
    const progressY = 440;
    const progressWidth = 600;
    const progressHeight = 30;
    const progressX = (800 - progressWidth) / 2;
    
    const current = data.currentXP;
    const target = data.requiredXP;
    const progress = Math.min((current / target) * 100, 100);
    const filledWidth = (progress / 100) * progressWidth;

    // Progress background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    drawRoundedRect(ctx, progressX, progressY, progressWidth, progressHeight, 15);
    ctx.fill();

    // Progress fill with gradient
    const progressGradient = createGradient(ctx, progressX, progressY, filledWidth, progressHeight, [
      '#00b894',
      '#00cec9',
      '#74b9ff'
    ]);
    ctx.fillStyle = progressGradient;
    drawRoundedRect(ctx, progressX, progressY, filledWidth, progressHeight, 15);
    ctx.fill();

    // Progress text
    ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(`${current} / ${target} XP`, progressX + progressWidth / 2, progressY + 20);

    // Total XP
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#ddd';
    ctx.shadowBlur = 2;
    ctx.fillText(`إجمالي الخبرة: ${formatNumber(data.totalXP)}`, 400, progressY + 60);

    // Server icon in corner
    const serverIconURL = message.guild.iconURL({ format: 'png', size: 256 });
    if (serverIconURL) {
      try {
        const serverImage = await Canvas.loadImage(serverIconURL);
        const serverSize = 50;
        const serverX = 720;
        const serverY = 60;

        ctx.save();
        ctx.beginPath();
        ctx.arc(serverX + serverSize / 2, serverY + serverSize / 2, serverSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(serverImage, serverX, serverY, serverSize, serverSize);
        ctx.restore();

        // Server icon border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(serverX + serverSize / 2, serverY + serverSize / 2, serverSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      } catch (error) {
        console.log('Could not load server icon');
      }
    }

    ctx.shadowBlur = 0;
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