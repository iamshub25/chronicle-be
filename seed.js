require('dotenv').config();
const mongoose = require('mongoose');
const moduleAlias = require('module-alias/register');

require('./config/mongo')();

const Server = require('@model/Server');
const Rule = require('@model/Rule');
const Rank = require('@model/Rank');
const Staff = require('@model/Staff');
const Setting = require('@model/Setting');

const seedData = async () => {
  try {
    await Setting.deleteMany({});
    await Setting.insertMany([
      { key: "discord_link", value: "https://discord.gg/your-invite", label: "Discord Invite Link", description: "The primary discord invite link used across the website." },
      { key: "site_name", value: "Chronicle Rust", label: "Website Name", description: "The name of your community/website." }
    ]);

    await Server.deleteMany({});
    await Server.insertMany([
      { name: 'Chronicles US 2x Vanilla', type: '2x', mapSize: '3500', maxPlayers: 250, wipeDate: 'Today 2:00 PM', ip: '192.168.1.100:28015', battlemetricsId: '5966453' },
      { name: 'Chronicles EU 10x Modded', type: '10x', mapSize: '4000', maxPlayers: 400, wipeDate: 'Yesterday', ip: '192.168.1.101:28015', battlemetricsId: '3352763' },
      { name: 'Chronicles US 5x No BPs', type: '5x', mapSize: '3500', maxPlayers: 150, wipeDate: '2 Days Ago', ip: '192.168.1.102:28015' }
    ]);

    await Rule.deleteMany({});
    await Rule.insertMany([
      { title: "1. No Cheating, Scripting, or Exploiting", content: "Use of any third-party software, scripts (including recoil macros), or exploits to gain an unfair advantage will result in an immediate, permanent ban.", orderIndex: 1 },
      { title: "2. Respect the Team Limit", content: "Do not exceed the team limit stated in the server description. This includes roaming, raiding, or living in the same base. Swapping members requires clearing auths and killing the old member.", orderIndex: 2 },
      { title: "3. No Racism or Bigotry", content: "Hate speech, racism, homophobia, and excessive toxicity will not be tolerated in voice or global chat. We want a competitive but welcoming environment.", orderIndex: 3 },
      { title: "4. Doxxing & Real Life Threats", content: "Releasing personal information about other players or making threats regarding real-life harm will result in a permanent ban across all our servers.", orderIndex: 4 },
      { title: "5. Stream Sniping", content: "Targeting content creators to ruin their experience using their live broadcast is prohibited and may result in a wipe ban.", orderIndex: 5 }
    ]);

    await Rank.deleteMany({});
    await Rank.insertMany([
      { name: "VIP", price: "5.00", color: "from-green-500 to-green-600", perks: ["Skip Queue", "Colored Chat Name", "Kit VIP (Daily)", "Discord Role"], isPopular: false },
      { name: "MVP", price: "15.00", color: "from-blue-500 to-blue-600", perks: ["Skip Queue", "Colored Chat Name", "Kit MVP (Daily)", "Custom Discord Role", "Skinbox Access", "Sign Artist Access"], isPopular: true },
      { name: "ELITE", price: "30.00", color: "from-red-600 to-red-700", perks: ["Skip Queue", "Colored Chat Name", "Kit ELITE (Daily)", "Custom Discord Role", "Skinbox Access", "Sign Artist Access", "Bypass Chat Cool Down", "Auto Doors"], isPopular: false }
    ]);

    await Staff.deleteMany({});
    await Staff.insertMany([
      { name: "Ripper", role: "Owner", avatar: "https://i.pravatar.cc/150?u=ripper" },
      { name: "AdminTom", role: "Head Admin", avatar: "https://i.pravatar.cc/150?u=admintom" },
      { name: "ModSarah", role: "Moderator", avatar: "https://i.pravatar.cc/150?u=modsarah" },
      { name: "HelperDave", role: "Helper", avatar: "https://i.pravatar.cc/150?u=helperdave" }
    ]);

    console.log("Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
