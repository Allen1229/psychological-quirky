const pages = {
  home: document.getElementById('home-page'),
  quiz: document.getElementById('quiz-page'),
  loading: document.getElementById('loading-page'),
  result: document.getElementById('result-page')
};

const elems = {
  startBtn: document.getElementById('start-btn'),
  restartBtn: document.getElementById('restart-btn'),
  questionCounter: document.getElementById('question-counter'),
  progressBar: document.getElementById('progress-bar'),
  questionTitle: document.getElementById('question-title'),
  optionsContainer: document.getElementById('options-container'),
  adModal: document.getElementById('ad-modal'),
  adTimer: document.getElementById('ad-timer'),
  adCloseBtn: document.getElementById('ad-close-btn')
};

let currentQuestion = 0;
let totalScore = 0;

function showPage(pageId) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[pageId].classList.add('active');
}

elems.startBtn.addEventListener('click', () => {
  currentQuestion = 0;
  totalScore = 0;
  renderQuestion();
  showPage('quiz');
});

function renderQuestion() {
  const q = quizData.questions[currentQuestion];
  elems.questionCounter.textContent = `第 ${currentQuestion + 1} 題 / 共 ${quizData.questions.length} 題`;
  elems.progressBar.style.width = `${((currentQuestion) / quizData.questions.length) * 100}%`;
  
  elems.questionTitle.innerHTML = q.question;
  elems.optionsContainer.innerHTML = '';
  
  // A=10, B=7, C=4, D=1 (計分微調)
  const scoreMap = { 'A': 10, 'B': 7, 'C': 3, 'D': 1 };
  
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => {
      // 動畫
      btn.classList.add('selected');
      setTimeout(() => {
        totalScore += scoreMap[opt.value] || 0;
        currentQuestion++;
        if (currentQuestion < quizData.questions.length) {
          renderQuestion();
        } else {
          elems.progressBar.style.width = '100%';
          finishQuiz();
        }
      }, 200);
    };
    elems.optionsContainer.appendChild(btn);
  });
}

function finishQuiz() {
  showPage('loading');
  
  setTimeout(() => {
    let resKey = 'res5';
    if(totalScore >= 50) resKey = 'res1';
    else if(totalScore >= 40) resKey = 'res2';
    else if(totalScore >= 25) resKey = 'res3';
    else if(totalScore >= 15) resKey = 'res4';
    
    const res = quizData.results[resKey];
    const resTitle = res.title;
    document.getElementById('result-title').textContent = resTitle;
    document.getElementById('result-desc').innerHTML = res.desc;
    document.getElementById('result-image').src = res.image;
    
    // 動態更新標題，利於 FB 抓取
    document.title = `我是「${resTitle}」！測測你的主人翁精神指數！`;
    
    showPage('result');
  }, 1800);
}

elems.restartBtn.addEventListener('click', () => {
  if (quizData.ads && quizData.ads.length > 0) {
    playAd();
  } else {
    showPage('home');
  }
});

function playAd() {
  const ad = quizData.ads[Math.floor(Math.random() * quizData.ads.length)];
  document.getElementById('ad-icon').src = ad.icon;
  document.getElementById('ad-title').textContent = ad.title;
  document.getElementById('ad-desc').textContent = ad.description;
  
  const actionBtn = document.getElementById('ad-action-btn');
  actionBtn.onclick = () => window.open(ad.url, '_blank');
  
  elems.adModal.classList.remove('hidden');
  elems.adCloseBtn.classList.add('hidden');
  elems.adTimer.classList.remove('hidden');
  
  let countdown = 5;
  elems.adTimer.textContent = countdown;
  
  const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(timer);
      elems.adTimer.classList.add('hidden');
      elems.adCloseBtn.classList.remove('hidden');
    } else {
      elems.adTimer.textContent = countdown;
    }
  }, 1000);
  
  elems.adCloseBtn.onclick = () => {
    elems.adModal.classList.add('hidden');
    showPage('home');
  };
}

// Share logic
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const resTitle = document.getElementById('result-title').textContent;
    const shareText = `【誰才是真正的主人？】我的測驗結果是「${resTitle}」！快來測測你的主人翁精神指數！`;
    const shareUrl = window.location.href;
    const fullText = `${shareText} ${shareUrl}`;

    // 一律先複製文字到剪貼簿 (最強備援)
    navigator.clipboard.writeText(fullText).then(() => {
      let platform = btn.id.replace('share-', '').toUpperCase();
      if (platform === 'THREADS') platform = 'Threads';
      
      // 顯示搞怪風格的提示
      const alertMsg = platform === 'IG' ? 
        `已為您複製結果！\n請直接在 IG 限動貼上即可分享！` : 
        `已為您複製結果！\n若 ${platform} 沒出現文字，直接貼上即可！`;
      alert(alertMsg);

      // 執行跳轉
      if (btn.id === 'share-fb') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      } else if (btn.id === 'share-line') {
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
      } else if (btn.id === 'share-threads') {
        window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(fullText)}`, '_blank');
      }
    });
  });
});

// "分享" label fallback
document.getElementById('share-label').onclick = () => {
  const resTitle = document.getElementById('result-title').textContent;
  const fullText = `【誰才是真正的主人？】我的測驗結果是「${resTitle}」！\n${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: '主人翁精神測驗',
      text: fullText,
      url: window.location.href
    }).catch(err => {
      navigator.clipboard.writeText(fullText).then(() => alert('測驗結果與連結已複製！'));
    });
  } else {
    navigator.clipboard.writeText(fullText).then(() => alert('測驗結果與連結已複製！'));
  }
};
