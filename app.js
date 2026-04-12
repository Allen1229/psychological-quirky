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
    document.getElementById('result-title').textContent = res.title;
    document.getElementById('result-desc').innerHTML = res.desc;
    document.getElementById('result-image').src = res.image;
    
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

// Share
document.querySelectorAll('.share-label-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    if(btn.textContent === '分享') return; // pure label fallback or do same
    const text = `【誰才是真正的主人？】我的測驗結果是「${document.getElementById('result-title').textContent}」！快來測測你的主人翁精神指數！`;
    if (navigator.share) {
      navigator.share({ title: '主人翁精神測驗', text, url: window.location.href }).catch(console.error);
    } else {
      alert('已複製分享內容！\n\n' + text);
    }
  });
});
