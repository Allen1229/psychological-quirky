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

// 複製文字工具函式（相容所有瀏覽器）
function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  } catch(e) { /* 即使失敗也不阻塞後續流程 */ }
}

// Share logic
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const resTitle = document.getElementById('result-title').textContent;
    const shareText = `【誰才是真正的主人？】我的測驗結果是「${resTitle}」！快來測測你的主人翁精神指數！`;
    const shareUrl = window.location.href;
    const fullText = shareText + ' ' + shareUrl;

    // 先複製
    copyText(fullText);

    // 根據平台跳轉
    if (btn.id === 'share-fb') {
      alert('已為您複製結果！\n若 FB 沒出現文字，直接貼上即可！');
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank');
    } else if (btn.id === 'share-line') {
      alert('已為您複製結果！\n若 LINE 沒出現文字，直接貼上即可！');
      window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(shareUrl) + '&text=' + encodeURIComponent(shareText), '_blank');
    } else if (btn.id === 'share-threads') {
      alert('已為您複製結果！\n若 Threads 沒出現文字，直接貼上即可！');
      window.open('https://www.threads.net/intent/post?text=' + encodeURIComponent(fullText), '_blank');
    } else if (btn.id === 'share-ig') {
      alert('已為您複製結果！\n請前往 IG 限動或貼文，直接貼上即可分享！');
    }
  });
});

// "分享" label fallback
document.getElementById('share-label').onclick = () => {
  const resTitle = document.getElementById('result-title').textContent;
  const fullText = '【誰才是真正的主人？】我的測驗結果是「' + resTitle + '」！ ' + window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: '主人翁精神測驗',
      text: fullText,
      url: window.location.href
    }).catch(() => {
      copyText(fullText);
      alert('測驗結果與連結已複製！');
    });
  } else {
    copyText(fullText);
    alert('測驗結果與連結已複製！');
  }
};
