let greeting = `
<b>안녕하세요. 세종대학교 챗봇이에요😀</b><br>
학사안내, 학과정보, 교내시설 등 학교생활에서 궁금한 점을 질문해주시면 안내해드릴게요😉<br>
<br>
간단한 문장 혹은 키워드로 질문해주시면 더 잘 이해할 수 있어요!<br>
<br>
예시)<br>
▪전자정보통신공학과 과사 위치<br>
▪홍길동 교수님<br>
▪세사봉에 대해 알려줘<br>
<br>
&nbsp&nbsp<b>자주 물어보는 질문</b><br>
<div id="faq1" class="faq" onClick="faqClick(this.id)">🗓️&nbsp학사 일정</div>
<div id=faq2 class="faq" onClick="faqClick(this.id)">📞&nbsp교무처</div>
<div id="faq3" class="faq" onClick="faqClick(this.id)">💻&nbsp수강신청</div>
<div id="faq4" class="faq" onClick="faqClick(this.id)">💸&nbsp장학금</div>
`

// 답변 말풍선 만드는 함수
function makeAnswer(a) {
  let content = document.querySelector('#content');
  let answerFrame = document.createElement('div');
  let newAnswer = document.createElement('div');
  let profile = document.createElement('div');
  let currentTime = document.createElement('div');
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  profile.setAttribute('class', 'profile');
  answerFrame.setAttribute('class', 'answer_frame');
  newAnswer.setAttribute("class", "chat_answer");
  currentTime.setAttribute('class', 'answer_time');
  answerFrame.appendChild(profile);
  answerFrame.appendChild(newAnswer);
  content.appendChild(answerFrame)
  content.appendChild(currentTime);
  newAnswer.innerHTML = a;
  if(currentHour > 12) {
    currentHour = currentHour - 12;
    if(currentMinute < 10) {
      currentTime.textContent = `오후 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오후 ${currentHour}:${currentMinute}`;
    }
  }else if(currentHour < 12){
    if(currentMinute < 10) {
      currentTime.textContent = `오전 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오전 ${currentHour}:${currentMinute}`;
    }
  }else {
    if(currentMinute < 10) {
      currentTime.textContent = `오후 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오후 ${currentHour}:${currentMinute}`;
    }
  }
}

// 답변 가져오는 함수 getResponse()
async function getResponse(req) {
  let response = await fetch('http://localhost:8080/message/1234?texts='+req);
  let data = await response.text();
  // let answer = data['message'];
  let answer = data;
  console.log(answer);
  makeAnswer(answer);
  scrollToBottom();
}

let sendBtn = document.getElementById('sendBtn');

// 질문 말풍선 만드는 함수
function sendQuest(input) {
  let questFrame = document.createElement('div');
  let myQuestion = document.createElement('div');
  let currentTime = document.createElement('div');
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  questFrame.setAttribute('class', 'quest_frame');
  myQuestion.setAttribute('class', 'chat_quest');
  currentTime.setAttribute('class', 'question_time');
  questFrame.appendChild(myQuestion);
  content.appendChild(questFrame);
  content.appendChild(currentTime);
  myQuestion.innerText = input;
  if(currentHour > 12) {
    currentHour = currentHour - 12;
    if(currentMinute < 10) {
      currentTime.textContent = `오후 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오후 ${currentHour}:${currentMinute}`;
    }
  }else if(currentHour < 12){
    if(currentMinute < 10) {
      currentTime.textContent = `오전 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오전 ${currentHour}:${currentMinute}`;
    }
  }else {
    if(currentMinute < 10) {
      currentTime.textContent = `오후 ${currentHour}:0${currentMinute}`;
    }else {
      currentTime.textContent = `오후 ${currentHour}:${currentMinute}`;
    }
  }
}

// 자동으로 스크롤 내려가는 함수
function scrollToBottom() {
  content.scrollTop = content.scrollHeight;
}

// 전송버튼을 클릭했을 때
sendBtn.addEventListener('click', () => {
  let question = document.querySelector("#question");
  if(question.value != ""){
    getResponse(question.value);
    sendQuest(question.value);
    scrollToBottom();
    question.value = ""
    document.querySelector("#sendBtn").style.backgroundImage = "url('./images/send.png')";
  }else {

  }
});

function checkText() {
  let input = document.querySelector("#question");
  let btn = document.querySelector("#sendBtn");
  if(input.value.length > 0){
    btn.style.backgroundImage = "url('./images/send_hover.png')";
  }else {
    btn.style.backgroundImage = "url('./images/send.png')";
  }
}


let body = document.body;

// Enter를 눌렀을 때
body.addEventListener("keypress", (e) => {
  let question = document.querySelector('#question');
  if(e.code == "Enter"){
    if(question.value != "") {
      console.log("Correct");
      getResponse(question.value);
      sendQuest(question.value);
      scrollToBottom()
      question.value = ""
    }
  }
})

// 처음접속 or 새로고침 시 1초 뒤 인사말 표시
window.onload = setTimeout(function() {
  makeAnswer(greeting)
  let greetingProfile = document.querySelector(".profile");
  greetingProfile.style.backgroundImage = "url('./images/mascot_greeting.png')";
}, 1000)

let faq1 = document.querySelector("#faq1");
let faq2 = document.querySelector("#faq2");
let faq3 = document.querySelector("#faq3");
let faq4 = document.querySelector("#faq4");
let faq = document.querySelectorAll(".faq");

// faq에서 질문 버튼을 눌렀을 때
function faqClick(clicked_id) {
  let question = document.querySelector("#question");
  let clicked_faq = document.getElementById(clicked_id).textContent
  let filtered_Faq = clicked_faq.replace(/[\uD800-\uDFFF]./g, '');
  sendQuest(filtered_Faq);
  getResponse(filtered_Faq);
  scrollToBottom();
  question.value = "";
}

// 피드백 버튼을 눌렀을 때
document.querySelector("#feedback").addEventListener("click", () => {
  if(confirm("세종대학교 챗봇 피드백 페이지로 이동하시겠습니까?📝")) {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScwhKonY_6uS0brQXkBVYb_jkmYpjaDFRBhK3gKVf7-bY9YUg/viewform?usp=sf_link", "_blank");
  }else {

  }
})
document.querySelector("#potal").addEventListener("click", () => {
  window.open("https://portal.sejong.ac.kr/jsp/login/loginSSL.jsp?rtUrl=portal.sejong.ac.kr/comm/member/user/ssoLoginProc.do", "_blank");
})
document.querySelector("#homepage").addEventListener("click", () => {
  window.open("http://www.sejong.ac.kr/", "_blank");
})



// 모달 열기 버튼 클릭 시 이벤트 핸들러
document.getElementById("list").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

// 모달 닫기 버튼 및 모달 바깥 영역 클릭 시 이벤트 핸들러
var closeButtons = document.getElementsByClassName("close");
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
}

document.getElementById("overlay").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});