
const{ MessageEmbed , Permissions} = require('discord.js');
const db = require('quick.db')
const { default_prefix , color,error,owner,checked,xmark } = require("../config.json")
const talkedRecently = new Set();
module.exports = {
	name: 'prefix',
	description: 'set a custom prefix for the server',
	aliases:["setprefix","prefixset"],
	usage: ' \```YAML\n\n prefix set , \n prefix delete \``` ',
  category: "config",
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: async(message, args, client) => {
        
            if (talkedRecently.has(message.author.id)) {
             message.react(`⌛`)
    } else {



        let missperms = new MessageEmbed()
        .setDescription(`${xmark}  You're missing \`MANAGE_GUILD\` permission`)
        .setColor(error)
        let missprefix = new MessageEmbed()
        .setDescription(`${xmark}   Please provide A Prefix`)
        .setColor(error)
        let doublec = new MessageEmbed()
        .setDescription(`${xmark}  You cannot set prefix to a double argument`)
        .setColor(error)
        let lengthprefix = new MessageEmbed()
        .setDescription(`${xmark}  prefix can't be longer than 3 characters`)
        .setColor(error)
        let resetfix = new MessageEmbed()
        .setDescription(`${checked}  prefix has been reset to Default`)
        .setColor(color)
        let succesfulfix = new MessageEmbed()
        .setDescription(`${checked} Prefix updated to ${args[1]}`)
        .setColor(color)
    
        /*
                let missperms = new MessageEmbed()
        .setDescription(`${xmark}  You're missing \`MANAGE_GUILD\` permission`)
        .setColor(error)
        if (!message.member.permissions.has([ Permissions.FLAGS.MANAGE_GUILD])) return message.reply({ embeds:[missperms]});
    
        if (!args[0]) {
          return message.reply({ embeds:[missprefix] })
        }
    
        if (args[1]) {
          return message.reply({ embeds:[doublec]})
        }
        if (args[0].length > 3) {
          return message.reply({ embeds:[lengthprefix] })
        }
    
        if (args.join("") === default_prefix) {
          db.delete(`prefix_${message.guild.id}`)
          return await message.reply({ embeds:[succesfulfix]})
        } 
    
        db.set(`prefix_${message.guild.id}`, args[0])
        await message.reply({ embeds:[succesfulfix]}) */
      
        if(!args[0]) {
               let serverfix = db.get(`prefix_${message.guild.id}`)
      if(serverfix === null) serverfix = `Not Set`
      let userfix = db.get(`prefix_${message.author.id}`)
      if(userfix === null) userfix = `Not Set`
      
            let mentionedMember =  message.member;
      const prefixEmbed = new MessageEmbed()
        .setDescription(`<:Settings:1032717784456626226>   **Prefixes For ${message.author.username}** \n> Default Prefix: \`${default_prefix}\` , <@${client.user.id}> \n> Server prefix: \`${serverfix || `Not Set`}\` \n> Custom Prefix: \`${userfix || "Not Set"}\``)
        .setColor(color)  
      message.reply({embeds:[prefixEmbed]})
          
       }
      else if(args[0] === 'set'){
        
        
        if (!message.member.permissions.has([ Permissions.FLAGS.MANAGE_GUILD])) return message.reply({ embeds:[missperms]});
    
        if (!args[1]) {
          return message.reply({ embeds:[missprefix] })
        }
    
        if (args[2]) {
          return message.reply({ embeds:[doublec]})
        }
        if (args[1].length > 4) {
          return message.reply({ embeds:[lengthprefix] })
        }
    
        if (args.join("") === default_prefix) {
          db.delete(`prefix_${message.guild.id}`)
          return await message.reply({ embeds:[succesfulfix]})
        }
    
        db.set(`prefix_${message.guild.id}`, args[1])
        await message.reply({ embeds:[succesfulfix]})
       } else if (args[0] === 'delete') {
     
         db.delete(`prefix_${message.guild.id}`)
        await message.reply({ embeds:[resetfix]})
       }
      }
            talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 3500);
    }

    }