const quizData = {
  questions: [
    {
      question: "一早進辦公室，發現飲水機沒水了，你會怎麼做？",
      options: [
        { text: "默默換上新水桶，順便對著新水桶敬禮", value: "A" },
        { text: "用廣播大喊：「飲水機沒水啦！誰來救救大家的喉嚨！」", value: "B" },
        { text: "找隔壁同事抱怨：「這間公司的水桶為什麼永遠是空的？」", value: "C" },
        { text: "裝作沒看到，快速回到位子假裝很忙", value: "D" }
      ]
    },
    {
      question: "開會時，老闆提出了一個明顯有洞的超爛企劃，你的反應是？",
      options: [
        { text: "拍桌大喊：「老闆，你這是在扼殺公司的未來！」", value: "A" },
        { text: "用委婉的語氣說：「這個想法很有創意，『不過』...」", value: "B" },
        { text: "傳 LINE 給同事：「他又在發作了」", value: "C" },
        { text: "默默點頭，心想反正公司倒了我也只是換個地方喝茶", value: "D" }
      ]
    },
    {
      question: "下班時間到了，但你發現辦公室最後一個離開的人沒關冷氣，這時你已經走到捷運站，你會？",
      options: [
        { text: "拔腿狂奔回公司關冷氣，絕不能浪費公司一分一毫電費！", value: "A" },
        { text: "傳訊息問還有沒人在辦公室，找不到人就算了", value: "B" },
        { text: "告訴自己：「當作是公司貢獻給北極熊的愛心。」", value: "C" },
        { text: "什麼冷氣？我腦中只有準時下班的喜悅", value: "D" }
      ]
    },
    {
      question: "公司年終尾牙，抽獎抽到最大獎「總經理的擁抱一個」，你會？",
      options: [
        { text: "激動落淚，認為這是比現金還要珍貴的無價之寶", value: "A" },
        { text: "爽快上台接受擁抱，並順便在總經理耳邊要求加薪", value: "B" },
        { text: "試圖以 500 元降價轉賣給隔壁的主管", value: "C" },
        { text: "假裝肚子痛，在廁所躲到抽下一波獎", value: "D" }
      ]
    },
    {
      question: "在路邊看到有人亂丟垃圾，你會？",
      options: [
        { text: "衝上前去把垃圾撿起來，順便對那個人進行3分鐘的道德勸說", value: "A" },
        { text: "默默幫他撿起來扔進垃圾桶，深藏功與名", value: "B" },
        { text: "心裡罵了一句髒話，然後豪邁地跨過去", value: "C" },
        { text: "拍張照發 IG 限動強烈譴責，但垃圾原封不動留在原地", value: "D" }
      ]
    },
    {
      question: "如果有人問你：「你覺得這間公司（或地球）到底是誰的？」你會回答：",
      options: [
        { text: "「當然是我的！我與它共存亡！」", value: "A" },
        { text: "「大家的吧，每個人都應該負責啦。」", value: "B" },
        { text: "「不知道，我只想平安活到這個週末。」", value: "C" },
        { text: "「老闆的/有錢人的，我只是一個無情的賺錢機器。」", value: "D" }
      ]
    }
  ],
  results: {
    res1: {
      title: "霸總魂借屍還魂",
      desc: "你的主人翁意識已經突破天際！不管是別人的公司還是社區，你都把它當作<span class='highlight'>自己的財產在經營</span>。老闆如果知道你有這種霸總精神，可能會因為太感動而把公司過戶給你（或者因為太害怕你篡位而把你開除）。", // 50-60
      image: "images/res1.png"
    },
    res2: {
      title: "熱血無雙里長伯",
      desc: "你是一個充滿熱情與責任感的人！雖然這並不是你名下的產物，但你總是<span class='highlight'>忍不住要多管閒事</span>。看到垃圾會撿、同事有難會幫，你是大家不可或缺的熱心大天使。", // 40-49
      image: "images/res2.png"
    },
    res3: {
      title: "看破紅塵的精明社畜",
      desc: "你的主人翁意識拿捏得很精準。懂得在關鍵時刻展現責任感，但在沒人看到的時候，你也是個<span class='highlight'>稱職的摸魚大師</span>。生活與工作平衡得恰到好處，是個懂得在夾縫中求生存的聰明人。", // 25-39
      image: "images/res3.png"
    },
    res4: {
      title: "無情的打卡機器",
      desc: "對你來說，責任感什麼的都是浮雲，<span class='highlight'>準時下班才是唯一的真理！</span>口頭禪是「那又不是我的工作」。雖然看起來冷酷，但你也絕對不惹麻煩，是個本分的透明人。", // 15-24
      image: "images/res4.png"
    },
    res5: {
      title: "宇宙級隱性破壞王",
      desc: "你不但沒有主人翁意識，甚至有點唯恐天下不亂！看到爛企劃會偷笑、看到冷氣沒關會裝死。你的存在本身就在<span class='highlight'>考驗著這個社會的韌性</span>。拜託請對這世界手下留情啊！", // 6-14
      image: "images/res5.png"
    }
  },
  ads: [
    {
      title: "明星3缺1",
      description: "台灣最多人玩16張麻將，1秒湊桌全真人線上打麻將！知名藝人正版授權，等你來+1。",
      icon: "https://www.gametower.com.tw/images/index/games/pic_iStar31.png",
      url: "https://www.gametower.com.tw/Games/FreePlay/Mj/star31/?utm_source=quirky-ownership-quiz&utm_medium=display&utm_campaign=mega_traffic_2026&utm_content=1rd_banner"
    },
    {
      title: "玩星派對",
      description: "全台第一休閒娛樂平台，收納各種類型的休閒遊戲讓您盡情暢玩！豐富的養成元素，培養專屬二次元角色。",
      icon: "https://www.gametower.com.tw/images/index/games/pic_pg.png",
      url: "https://www.gametower.com.tw/Games/PG/?utm_source=quirky-ownership-quiz&utm_medium=display&utm_campaign=mega_traffic_2026&utm_content=2rd_banner"
    }
  ]
};
