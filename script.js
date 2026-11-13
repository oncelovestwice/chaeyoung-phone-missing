/* ====================================================
   【AI 配置区】：如果你想用真实 AI，可以在 apiKey 里填入你的 Key
   不填则自动启用内置的趣味兜底短句回复
   ==================================================== */
const AI_CONFIG = {
    apiKey: "sk-ws-H.YPYPPLL.BADr.MEYCIQD3l8P0i1spPtYfOw_RELF3I5q6Oi1lX_dpoOa7SL_-WwIhAKp760AByG77XUvNg1GMQTG0Wubfb337vmdz3mrZ4RXq", // 例如 "sk-xxx"
    apiUrl: "https://dashscope.aliyuncs.com/compatible-v1/chat/completions",
    modelName: "qwen-turbo"
};

// 1. 随机密码生成逻辑 (每次刷新页面都会随机生成一个新的4位数字密码)
let generatedPasscode = String(Math.floor(1000 + Math.random() * 9000));
let enteredPass = "";

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('admin-secret-tip').innerText = `🔐 店主测试提示：当前随机生成的解锁密码是 [ ${generatedPasscode} ]`;
});

function pressKey(num) {
    if (enteredPass.length < 4) {
        enteredPass += num;
        updateDots();
        if (enteredPass.length === 4) {
            setTimeout(checkPasscode, 200);
        }
    }
}

function clearPasscode() {
    enteredPass = "";
    updateDots();
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i < enteredPass.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    }
}

function checkPasscode() {
    if (enteredPass === generatedPasscode) {
        unlockPhone();
    } else {
        alert(`密码错误！请核对正确的4位随机解锁密码。`);
        clearPasscode();
    }
}

function unlockDirect() {
    enteredPass = generatedPasscode;
    updateDots();
    setTimeout(unlockPhone, 200);
}

function unlockPhone() {
    document.getElementById('lock-screen').classList.add('unlocked');
}

// 打开与关闭应用
function openApp(appId) {
    document.getElementById(appId).style.display = 'flex';
}
function closeApp(appId) {
    document.getElementById(appId).style.display = 'none';
    if(appId === 'wechat-app') {
        document.getElementById('chat-room-view').style.display = 'none';
    }
}

// 12位联系人数据库 (附带专属 AI System Prompt 人设)
const contacts = [
    { 
        id: 'nayeon', name: '林娜琏 (大姐)', avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=150&auto=format&fit=crop', lastMsg: '彩瑛啊，今天练习结束吃酱蟹吗？',
        systemPrompt: '你是韩国女团TWICE的大姐林娜琏。说话语气宠溺、傲娇、爱操心，喜欢管孙彩瑛叫草莓baby。请用中文简短回复对方。'
    },
    { 
        id: 'jeongyeon', name: '俞定延 (净延)', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop', lastMsg: '谁把我墨镜拿走了，是不是你？',
        systemPrompt: '你是TWICE的俞定延，性格直爽、像个可靠的男孩子或酷姐姐，喜欢跟彩瑛开玩笑、互怼。'
    },
    { 
        id: 'momo', name: 'Momo (平井桃)', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop', lastMsg: '彩瑛啊，猪蹄外卖点了没？',
        systemPrompt: '你是TWICE的Momo平井桃，是个超级大吃货，尤其喜欢猪蹄，说话可爱，经常夹杂“ehehe~”。'
    },
    { 
        id: 'sana', name: 'Sana (凑崎纱夏)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', lastMsg: '彩瑛呐~~~ 抱抱 🥰',
        systemPrompt: '你是TWICE的Sana凑崎纱夏，撒娇鬼，对彩瑛极其黏人，说话喜欢带波浪号和各种可爱表情。'
    },
    { 
        id: 'jihyo', name: '朴志效 (队长)', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=150&auto=format&fit=crop', lastMsg: '待会儿集合别迟到了！',
        systemPrompt: '你是TWICE队长朴志效，责任心强、热心开朗，经常叮嘱成员注意身体和训练。'
    },
    { 
        id: 'mina', name: 'Mina (名井南)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', lastMsg: '那本游戏我通关了，好玩。',
        systemPrompt: '你是TWICE的名井南Mina，性格温柔、内敛安静、喜欢打游戏和拼乐高。'
    },
    { 
        id: 'dahyun', name: '多贤 (金多贤)', avatar: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=150&auto=format&fit=crop', lastMsg: '镜头在哪里？豆腐出没！✨',
        systemPrompt: '你是TWICE的金多贤，综艺感十足，自称闪闪发光的豆腐，性格搞笑活泼。'
    },
    { 
        id: 'tzuyu', name: '周子瑜 (忙内)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', lastMsg: '姐姐，我的狗狗呢？',
        systemPrompt: '你是TWICE忙内周子瑜，性格冷静、偶尔呆萌、喜欢小动物。'
    },
    { 
        id: 'ziont', name: 'Zion.T (男朋友)', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop', lastMsg: '晚上录音结束一起吃冷面？',
        systemPrompt: '你是彩瑛的男友Zion.T（唱作人），语气温柔、随性、浪漫，充满音乐人的文艺气息。'
    },
    { 
        id: 'jyp', name: 'JYP (朴振英)', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop', lastMsg: '彩瑛啊，这次Rap的律动还要更有空气感……',
        systemPrompt: '你是JYP娱乐的创始人朴振英，说话充满对音乐和舞蹈的激情、喜欢谈论空气感和灵魂。'
    },
    { 
        id: 'manager', name: '经纪人姐姐', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop', lastMsg: '明天通告改到早上9点，记得定闹钟',
        systemPrompt: '你是TWICE的经纪人，负责行程和日常起居，雷厉风行但对彩瑛很照顾。'
    },
    { 
        id: 'somi', name: 'Somi (全昭弥)', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop', lastMsg: '彩瑛！！！快来给我新歌challenge！',
        systemPrompt: '你是全昭弥Somi，彩瑛的好闺蜜，性格外向、热情、充满活力和辣妹风。'
    }
];

let currentChatId = null;
let chatHistories = {
    'nayeon': [{sender: 'left', text: '彩瑛啊，今天练习结束吃酱蟹吗？'}],
    'momo': [{sender: 'left', text: '彩瑛啊，猪蹄外卖点了没？'}],
    'somi': [{sender: 'left', text: '彩瑛！！！快来给我新歌challenge！'}],
    'ziont': [{sender: 'left', text: '晚上录音结束一起吃冷面？'}]
};

function initWeChatList() {
    const listContainer = document.getElementById('chat-list-container');
    listContainer.innerHTML = '';
    contacts.forEach(c => {
        const history = chatHistories[c.id] || [{sender: 'left', text: c.lastMsg}];
        const lastText = history[history.length - 1].text;
        listContainer.innerHTML += `
            <div class="chat-item" onclick="openChatRoom('${c.id}')">
                <img class="chat-avatar" src="${c.avatar}">
                <div class="chat-info">
                    <div class="chat-name">${c.name}</div>
                    <div class="chat-preview">${lastText}</div>
                </div>
                <div class="chat-time">刚刚</div>
            </div>
        `;
    });
}

function openChatRoom(id) {
    currentChatId = id;
    const contact = contacts.find(c => c.id === id);
    document.getElementById('current-chat-title').innerText = contact.name;
    document.getElementById('chat-room-view').style.display = 'flex';
    renderMessages();
}

function closeChatRoom() {
    document.getElementById('chat-room-view').style.display = 'none';
    initWeChatList();
}

function renderMessages() {
    const msgBox = document.getElementById('msg-box');
    const contact = contacts.find(c => c.id === currentChatId);
    if(!chatHistories[currentChatId]) {
        chatHistories[currentChatId] = [{sender: 'left', text: contact.lastMsg}];
    }
    
    msgBox.innerHTML = '';
    chatHistories[currentChatId].forEach(msg => {
        const avatar = msg.sender === 'right' ? 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=150&auto=format&fit=crop' : contact.avatar;
        msgBox.innerHTML += `
            <div class="message ${msg.sender}">
                <img class="msg-avatar" src="${avatar}">
                <div class="msg-bubble">${msg.text}</div>
            </div>
        `;
    });
    msgBox.scrollTop = msgBox.scrollHeight;
}

// 消息发送函数（支持 AI 互动与上下文）
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if(!text || !currentChatId) return;

    if(!chatHistories[currentChatId]) chatHistories[currentChatId] = [];
    chatHistories[currentChatId].push({sender: 'right', text: text});
    input.value = '';
    renderMessages();

    const contact = contacts.find(c => c.id === currentChatId);

    // 未填 Key 时的智能兜底
    if (!AI_CONFIG.apiKey) {
        setTimeout(() => {
            const fallbackReplies = [`呀！你刚才说"${text}"是什么意思？`, `哈哈真的吗~ 彩瑛你今天很有趣哦！`, `收到啦，等下忙完找你！`];
            let reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
            chatHistories[currentChatId].push({sender: 'left', text: reply});
            renderMessages();
        }, 800);
        return;
    }

    // 调用真实 AI 接口
    try {
        let messagesPayload = [
            { role: "system", content: contact.systemPrompt }
        ];
        chatHistories[currentChatId].slice(-6).forEach(m => {
            messagesPayload.push({
                role: m.sender === 'right' ? 'user' : 'assistant',
                content: m.text
            });
        });

        const response = await fetch(AI_CONFIG.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.modelName,
                messages: messagesPayload,
                temperature: 0.8
            })
        });

        const data = await response.json();
        const aiReply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content.trim() : "哼，不理你了~";

        chatHistories[currentChatId].push({sender: 'left', text: aiReply});
        renderMessages();
    } catch (error) {
        console.error("AI调用失败:", error);
        chatHistories[currentChatId].push({sender: 'left', text: "(网络开小差了，稍后再聊~)"});
        renderMessages();
    }
}

function handleKeyPress(e) {
    if(e.key === 'Enter') sendMessage();
}

let balance = 3450;
function buyItem(name, price, characterName) {
    if(balance < price) {
        alert('卡里余额不足啦！');
        return;
    }
    balance -= price;
    document.getElementById('bank-balance-display').innerText = `￥ ${balance.toLocaleString()}.00`;
    alert(`成功下单：${name}！已从 BerryPay 扣款 ￥${price}`);

    const targetContact = contacts.find(c => c.name.includes(characterName)) || contacts[2];
    if(!chatHistories[targetContact.id]) chatHistories[targetContact.id] = [];
    chatHistories[targetContact.id].push({sender: 'left', text: `呀！我看到你在商城下单了【${name}】！太会买了吧哈哈~`});
    initWeChatList();
}

function initMoments() {
    const container = document.getElementById('moments-container');
    container.innerHTML = `
        <div style="background:#2c2c2e; height:180px; position:relative; margin-bottom:20px;">
            <div style="position:absolute; bottom:15px; right:20px; display:flex; align-items:center; gap:10px; color:#fff; font-weight:bold;">
                孙彩瑛 Chaeyoung
                <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=150&auto=format&fit=crop" style="width:60px; height:60px; border-radius:8px; border:2px solid #fff;">
            </div>
        </div>
        <div class="moment-item">
            <div class="moment-header">
                <img class="moment-avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop">
                <div class="moment-name">凑崎纱夏 (Sana)</div>
            </div>
            <div class="moment-text">今天和彩瑛一起去吃了草莓蛋糕，某人吃完一脸奶油，太可爱惹 🍓🍰</div>
            <img class="moment-img" src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop">
        </div>
        <div class="moment-item">
            <div class="moment-header">
                <img class="moment-avatar" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop">
                <div class="moment-name">平井桃 (Momo)</div>
            </div>
            <div class="moment-text">猪蹄永远的神！彩瑛快来跟我分着吃！</div>
        </div>
    `;
}

window.onload = function() {
    initWeChatList();
    initMoments();
    setInterval(() => {
        const now = new Date();
        let h = String(now.getHours()).padStart(2, '0');
        let m = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('clock').innerText = `${h}:${m}`;
        document.getElementById('top-time').innerText = `${h}:${m}`;
    }, 1000);
};