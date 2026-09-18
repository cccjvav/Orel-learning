const viewRoot = document.getElementById('viewRoot');
const breadcrumb = document.getElementById('breadcrumb');
const toast = document.getElementById('toast');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
let currentView = 'home';
let toastTimer;

const icons = {
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>',
  note: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.5-1.5 2.5h-5c0-1-.6-1.8-1.5-2.5Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 18c3-5 5 2 8-3s5 2 8-4"/><circle cx="18" cy="6" r="2.5"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg>',
  pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 10.5-10.5a2.1 2.1 0 0 0-3-3L5.2 16 4 20ZM14.5 7.5l2 2"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></svg>'
};

function statCard(icon, value, label) {
  return `<div class="stat-card"><div class="stat-icon">${icons[icon]}</div><div><strong>${value}</strong><span>${label}</span></div></div>`;
}

function renderHome() {
  return `
    <div class="page-head">
      <div><p class="eyebrow">Thursday, September 17</p><h1>Good morning, Alex <span class="wave">✦</span></h1><p class="subhead">Let's make one idea feel a little less mysterious today.</p></div>
      <div class="page-actions"><button class="btn" data-action="new-note">${icons.plus} Add a note</button><button class="btn primary" data-view="lesson">Continue learning ${icons.arrow}</button></div>
    </div>
    <div class="dashboard-grid">
      <div class="main-column">
        <section class="panel continue-card">
          <div class="continue-copy"><p class="eyebrow">Up next · Module 2</p><h2>What is a variable?</h2><p>A friendly first look at the named “boxes” programs use to remember information.</p><button class="btn primary" data-view="lesson">Pick up where you left off ${icons.arrow}</button><div class="lesson-meta"><span>${icons.clock} 12 min</span><span class="dot"></span><span>Beginner</span><span class="dot"></span><span>2 of 5 lessons</span></div><div class="progress-bar"><span></span></div></div>
          <div class="continue-art" aria-hidden="true"><div class="orbit one"></div><div class="orbit two"></div><div class="shape"></div><div class="dot a"></div><div class="dot b"></div></div>
        </section>
        <div class="stat-row">${statCard('chart','62%','Course progress')}${statCard('clock','3 days','Learning streak')}${statCard('target','8 / 10','Concepts understood')}</div>
        <section class="panel path-panel"><div class="section-heading"><h2>Your learning path</h2><button class="text-button" data-view="course">View full course ${icons.arrow}</button></div><div class="module-list">
          <div class="module-row complete" data-open="course"><div class="module-marker">${icons.check}</div><div class="module-info"><strong>Start here: the big picture</strong><span>2 lessons · Completed yesterday</span></div><div class="module-state">Done</div></div>
          <div class="module-row current" data-view="lesson"><div class="module-marker">${icons.book}</div><div class="module-info"><strong>Core ideas: storing information</strong><span>1 of 3 lessons · In progress</span></div><div class="module-state"><div class="mini-line"><span style="width:38%"></span></div>38%</div></div>
          <div class="module-row" data-open="practice"><div class="module-marker">${icons.target}</div><div class="module-info"><strong>Practice lab: make it click</strong><span>3 guided practices · Up next</span></div><div class="module-state">Not started</div></div>
          <div class="module-row" data-open="course"><div class="module-marker">${icons.layers}</div><div class="module-info"><strong>Connect the dots</strong><span>4 lessons · Later</span></div><div class="module-state">Locked</div></div>
        </div></section>
      </div>
      <div class="side-column">
        <section class="panel ask-card"><h2>Ask your study guide</h2><p>No question is too basic. Try asking in your own words.</p><form class="ask-form" id="askForm"><input id="askInput" autocomplete="off" placeholder="e.g. What is a variable?" aria-label="Ask a study question" /><button aria-label="Ask question">${icons.arrow}</button></form><div class="suggested"><button data-question="What is a variable?">What is a variable?</button><button data-question="What is code?">What is code?</button><button data-question="Give me an example">Give me an example</button></div></section>
        <section class="panel focus-panel"><div class="section-heading"><h2>Small focus for today</h2><button class="text-button" data-action="focus-done">Done</button></div><div class="focus-item"><i class="focus-bullet"></i><div><strong>Understand one idea</strong><p>Finish “What is a variable?”</p></div></div><div class="focus-item"><i class="focus-bullet"></i><div><strong>Say it in your words</strong><p>Use the practice prompt below.</p></div></div></section>
        <section class="panel focus-panel"><div class="section-heading"><h2>Recent notes</h2><button class="text-button" data-view="notes">See all ${icons.arrow}</button></div><div class="focus-item"><i class="focus-bullet"></i><div><strong>A variable is a named box</strong><p>Saved 2 hours ago</p></div></div><div class="focus-item"><i class="focus-bullet"></i><div><strong>Questions to revisit</strong><p>Saved yesterday</p></div></div></section>
      </div>
    </div>`;
}

function renderCourse() {
  return `
    <div class="page-head"><div><p class="eyebrow">My course</p><h1>Foundations of code</h1><p class="subhead">A slow, friendly path from “what is that?” to making your first tiny program.</p></div><div class="page-actions"><button class="btn" data-action="share-course">${icons.plus} Invite a study buddy</button></div></div>
    <div class="course-overview"><section class="panel course-hero"><div><p class="eyebrow">Your current course</p><h2>Foundations of code</h2><p>Learn the building blocks behind every program, with examples you can explain back.</p></div><div class="progress-bar"><span></span></div><span class="course-percent">62% complete</span></section><div class="course-stats"><div class="panel course-stat"><div><span>Time to finish</span><strong>3h 20m</strong></div>${icons.clock}</div><div class="panel course-stat"><div><span>Concepts learned</span><strong>8 of 13</strong></div>${icons.check}</div><div class="panel course-stat"><div><span>Your level</span><strong>Beginner</strong></div>${icons.target}</div></div></div>
    <section class="panel course-map"><div class="section-heading"><h2>Course map</h2><span class="module-state">4 modules · 13 lessons</span></div>
      <div class="map-module done" data-open="course"><div class="map-number">✓</div><div><strong>1. Start here: the big picture</strong><p>What programs are, and how to think like a problem solver · 2 lessons</p></div><span class="module-tag">Complete</span></div>
      <div class="map-module active" data-view="lesson"><div class="map-number">2</div><div><strong>2. Core ideas: storing information</strong><p>Variables, values, and the names we give things · 3 lessons</p></div><span class="module-tag">In progress</span></div>
      <div class="map-module" data-open="practice"><div class="map-number">3</div><div><strong>3. Practice lab: make it click</strong><p>Short guided exercises that let you try each idea · 3 lessons</p></div><span class="module-tag">Up next</span></div>
      <div class="map-module" data-open="course"><div class="map-number">4</div><div><strong>4. Connect the dots</strong><p>Decisions, repetition, and putting the pieces together · 5 lessons</p></div><span class="module-tag">Locked</span></div>
    </section>`;
}

function renderPractice() {
  return `
    <div class="page-head"><div><p class="eyebrow">Practice room</p><h1>Let's make it click.</h1><p class="subhead">Practice is a conversation with the idea, not a test you can fail.</p></div><div class="page-actions"><button class="btn primary" data-view="lesson">Start a guided session ${icons.arrow}</button></div></div>
    <div class="practice-grid"><div class="main-column"><section class="panel practice-intro"><h2>Today’s gentle session</h2><p>We’ll revisit variables in three small steps: notice one, explain one, then choose one for a tiny story. Hints are always welcome.</p><span class="session-badge"><span></span> 8–10 minutes · no grades</span></section><section class="panel practice-list"><div class="section-heading"><h2>Guided practices</h2><span class="module-state">2 completed</span></div>
      <div class="training-card"><div class="training-icon">${icons.bulb}</div><div class="training-copy"><strong>Spot the idea</strong><p>Find the variable hiding in a short example.</p></div><button class="btn small" data-view="lesson">Practice ${icons.arrow}</button></div>
      <div class="training-card"><div class="training-icon">${icons.target}</div><div class="training-copy"><strong>Explain it simply</strong><p>Say what a variable does, in your own words.</p></div><button class="btn small" data-action="start-explain">Practice ${icons.arrow}</button></div>
      <div class="training-card"><div class="training-icon">${icons.note}</div><div class="training-copy"><strong>Use it in context</strong><p>Choose a name for a piece of information.</p></div><button class="btn small" data-action="start-context">Practice ${icons.arrow}</button></div>
    </section></div><div class="practice-side"><section class="panel week-card"><div class="section-heading"><h2>This week</h2><span class="text-button">3 / 5 days</span></div><div class="week-days"><div class="week-day done"><span>Mon</span><b>✓</b></div><div class="week-day done"><span>Tue</span><b>✓</b></div><div class="week-day today"><span>Wed</span><b>3</b></div><div class="week-day"><span>Thu</span><b>4</b></div><div class="week-day"><span>Fri</span><b>5</b></div></div></section><section class="panel tip-card"><span class="tip-label">A useful trick</span><p>Before looking at an answer, make a guess. Your brain learns more from checking a guess than from only reading.</p></section></div></div>`;
}

function renderNotes() {
  return `
    <div class="page-head"><div><p class="eyebrow">Your learning space</p><h1>Notes worth keeping.</h1><p class="subhead">Capture the sentence that made the idea feel clearer.</p></div><div class="page-actions"><button class="btn primary" data-action="new-note">${icons.plus} New note</button></div></div>
    <div class="resource-layout"><section class="panel notes-panel"><div class="notes-toolbar"><div class="search-field">${icons.search}<input id="noteSearch" placeholder="Search your notes" aria-label="Search your notes" /></div><span class="module-state">3 notes · newest first</span></div><div id="notesList">
      <article class="note-entry"><span class="note-tag">Variables</span><h3>A variable is a named box</h3><p>It gives a value a name so we can find and use it later. The value inside the box can change.</p><small>Saved today · from “What is a variable?”</small></article>
      <article class="note-entry"><span class="note-tag">Big picture</span><h3>Code is a set of instructions</h3><p>A program is not magic. It is a list of tiny instructions written clearly enough for a computer to follow.</p><small>Saved yesterday · from “The big picture”</small></article>
      <article class="note-entry"><span class="note-tag">Questions</span><h3>Things I want to revisit</h3><p>What is the difference between a value and a variable? Why do we give things names?</p><small>Saved Sep 15 · personal note</small></article>
    </div></section><div class="resource-side"><section class="panel mini-card"><h2>Note recipe</h2><p>Great notes do not copy the lesson. They make a tiny bridge back to it.</p><div class="checklist"><div class="check-row done"><i>✓</i><span>One idea in plain words</span></div><div class="check-row"><i>✓</i><span>One example</span></div><div class="check-row"><i>✓</i><span>One question</span></div></div></section><section class="panel mini-card"><h2>Need a prompt?</h2><p>Try finishing this sentence: “The part I understand now is…”</p><button class="btn small" data-action="new-note">Write it down ${icons.arrow}</button></section></div></div>`;
}

const terms = [
  ['Variable', 'A named place that holds a value.', 'noun · core idea'],
  ['Value', 'The actual piece of information inside a variable.', 'noun · core idea'],
  ['Code', 'Instructions written for a computer to follow.', 'noun · big picture'],
  ['Program', 'A complete set of instructions that does a job.', 'noun · big picture'],
  ['Function', 'A reusable group of instructions with a name.', 'noun · next module'],
  ['Bug', 'A mistake that makes a program behave differently than intended.', 'noun · problem solving']
];
function renderGlossary() {
  return `
    <div class="page-head"><div><p class="eyebrow">Reference shelf</p><h1>Words, made less scary.</h1><p class="subhead">A small glossary that grows as you learn. Open any term for an example.</p></div><div class="page-actions"><div class="search-field">${icons.search}<input id="termSearch" placeholder="Search terms" aria-label="Search glossary terms" /></div></div></div>
    <div class="glossary-list" id="glossaryList">${terms.map((term, index) => `<article class="term-card" data-term="${term[0].toLowerCase()}" data-term-index="${index}"><h3>${term[0]}</h3><p>${term[1]}</p><span class="term-type">${term[2]}</span></article>`).join('')}</div>`;
}

function renderLesson() {
  return `
    <div class="lesson-page"><div class="lesson-top"><button class="back-link" data-view="home">${icons.arrow.replace('M5 12h14m-6-6 6 6-6 6', 'M19 12H5m6 6-6-6 6-6')} Back to overview</button><div class="lesson-progress"><span>Lesson 2 of 5</span><div class="progress-bar"><span></span></div><strong>38%</strong></div></div>
      <div class="lesson-heading"><p class="eyebrow">Module 2 · Core ideas</p><h1>What is a variable?</h1><p class="subhead">A variable is one of the simplest ideas in code: a name we give to a piece of information so we can use it again.</p></div>
      <div class="lesson-layout"><article class="panel lesson-content"><div class="concept-callout"><div class="callout-icon">${icons.info}</div><div><strong>The short version</strong><p>A variable is a named box. The box holds a value, like a number or a word.</p></div></div><h2>Imagine a labeled box</h2><p>Suppose you are packing for a trip. You put your passport in a small box and write <strong>passport</strong> on the label. You do not need to remember exactly where the box is every time — you can look for the label.</p><div class="analogy-box"><strong>Everyday analogy</strong><p>The label is the <em>variable name</em>. The thing inside is the <em>value</em>. If you replace what is inside, the label can stay the same.</p></div><h2>How that looks in code</h2><p>Here, we give the value <strong>Alex</strong> the name <strong>name</strong>. Later, we can use <strong>name</strong> instead of typing <strong>Alex</strong> again.</p><div class="code-example"><div class="code-top"><i></i><i></i><i></i><span>hello.py</span></div><pre><span class="purple">name</span> <span class="orange">=</span> <span class="green">"Alex"</span>
<span class="blue">print</span>(<span class="purple">name</span>)

<span class="muted-code"># The computer remembers: name → Alex</span></pre></div><div class="guided-box"><span class="step-label">Try it with me · Step 1 of 1</span><h3>Which part is the variable name?</h3><p>Take a guess. We are looking for the label — not the thing stored inside it.</p><div class="choice-row"><button class="choice" data-choice="Alex">“Alex”</button><button class="choice" data-choice="name">name</button><button class="choice" data-choice="print">print</button></div><div class="feedback" id="choiceFeedback">${icons.check}<span id="feedbackText"></span></div></div><div class="lesson-next"><button class="btn primary" data-action="finish-lesson">That makes sense — next ${icons.arrow}</button></div></article><aside class="lesson-aside"><section class="panel lesson-side-card"><h2>In this lesson</h2><ul class="contents-list"><li class="active">The named box idea</li><li>Variable names and values</li><li>One tiny example</li><li>Practice together</li></ul></section><button class="panel btn save-note" data-action="save-lesson-note">${icons.note} Save this idea</button><section class="panel hint-card"><strong>Need a nudge?</strong><p>Ask yourself: which word would you say when you want the computer to find “Alex” again?</p><button class="text-button" data-action="show-hint">Show me a hint ${icons.arrow}</button></section></aside></div>
    </div>`;
}

function render(view = currentView) {
  currentView = view;
  const names = { home: 'Overview', course: 'My course', practice: 'Practice', notes: 'My notes', glossary: 'Glossary', lesson: 'Lesson 2' };
  document.querySelectorAll('.nav-item[data-view]').forEach(item => item.classList.toggle('active', item.dataset.view === (view === 'lesson' ? 'home' : view)));
  breadcrumb.innerHTML = `<span>${view === 'lesson' ? 'My course' : 'Workspace'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg><strong>${names[view]}</strong>`;
  viewRoot.innerHTML = view === 'home' ? renderHome() : view === 'course' ? renderCourse() : view === 'practice' ? renderPractice() : view === 'notes' ? renderNotes() : view === 'glossary' ? renderGlossary() : renderLesson();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function showModal(content) {
  modalContent.innerHTML = content;
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  const focusTarget = modalContent.querySelector('textarea, input, button');
  if (focusTarget) setTimeout(() => focusTarget.focus(), 50);
}
function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

function answerFor(question) {
  const q = question.toLowerCase();
  if (q.includes('variable')) return { title: 'A variable, in plain English', body: 'A variable is a name we give to a piece of information so we can use it again. Think of a labeled box: the label is the variable name, and the thing inside is its value.', example: 'name = "Alex"  →  the name label points to the value Alex' };
  if (q.includes('code') || q.includes('program')) return { title: 'Code, in plain English', body: 'Code is a set of instructions. A program is a whole set of those instructions working together to do a job. Computers follow them one small step at a time.', example: 'print("Hello")  →  an instruction to show the word Hello' };
  if (q.includes('value')) return { title: 'A value, in plain English', body: 'A value is the actual information being stored or used: a word, a number, or something else. In name = "Alex", the value is "Alex".', example: 'age = 24  →  24 is the value' };
  if (q.includes('example') || q.includes('show')) return { title: 'Here is a tiny example', body: 'Imagine a box labeled score. If we put the number 10 inside, the computer can use score whenever it needs that number.', example: 'score = 10  →  print(score)  →  10' };
  return { title: 'Let’s unpack that together', body: 'Start by looking for the smallest word or phrase that feels unclear. In this course, we slow down and connect new terms to everyday objects before using formal definitions.', example: 'Try asking: “What is the simple version of ___?”' };
}

function openQuestion(question) {
  const answer = answerFor(question);
  showModal(`<p class="modal-eyebrow">Your study guide · no question too basic</p><h2>${answer.title}</h2><p>${answer.body}</p><div class="code-example"><div class="code-top"><i></i><i></i><i></i><span>tiny example</span></div><pre>${answer.example}</pre></div><div class="modal-actions"><button class="btn" data-modal-action="close">Got it</button><button class="btn primary" data-modal-action="practice">Try it with me ${icons.arrow}</button></div>`);
}

function newNote() {
  showModal(`<p class="modal-eyebrow">Make it yours</p><h2>Write one sentence you want to remember.</h2><p>Use your own words — rough is better than perfect. You can always tidy it later.</p><textarea id="newNoteText" placeholder="The part I understand now is…"></textarea><div class="modal-actions"><button class="btn" data-modal-action="close">Not now</button><button class="btn primary" data-modal-action="save-new-note">Save note ${icons.check}</button></div>`);
}

// One delegated listener keeps the small app feeling snappy even as views change.
document.addEventListener('click', event => {
  const nav = event.target.closest('[data-view]');
  if (nav) { document.body.classList.remove('nav-open'); render(nav.dataset.view); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'new-note') return newNote();
  if (action === 'save-lesson-note') return showToast('Saved: “A variable is a named box.”');
  if (action === 'show-hint') return showToast('Hint: “name” is the label that helps us find Alex again.');
  if (action === 'finish-lesson') { showToast('Nice work — your next practice is ready.'); return render('practice'); }
  if (action === 'focus-done') { event.target.textContent = 'Saved ✓'; showToast('Focus saved for today.'); return; }
  if (action === 'share-course') return showToast('Study buddy link copied — sharing is coming soon.');
  if (action === 'start-explain') return showModal(`<p class="modal-eyebrow">Practice · explain it simply</p><h2>Finish the sentence</h2><p>Try this in your own words: “A variable is like a…”</p><textarea placeholder="It is like a…"></textarea><div class="modal-actions"><button class="btn" data-modal-action="close">I’ll think first</button><button class="btn primary" data-modal-action="show-coach">Show a coach example ${icons.arrow}</button></div>`);
  if (action === 'start-context') return showModal(`<p class="modal-eyebrow">Practice · use it in context</p><h2>Choose a helpful label</h2><p>You are tracking the number of books you have read. Which variable name makes the most sense?</p><div class="choice-row"><button class="choice context-choice" data-modal-action="context-answer" data-correct="false">blue</button><button class="choice context-choice" data-modal-action="context-answer" data-correct="true">booksRead</button><button class="choice context-choice" data-modal-action="context-answer" data-correct="false">thing</button></div><p id="contextFeedback" class="subhead"></p>`);
  if (action === 'feedback') return showToast('Thanks — your feedback helps shape a kinder learning space.');

  const open = event.target.closest('[data-open]');
  if (open) { const destination = open.dataset.open; if (destination === 'practice') render('practice'); else render('course'); return; }

  const questionChip = event.target.closest('[data-question]');
  if (questionChip) return openQuestion(questionChip.dataset.question);

  const choice = event.target.closest('[data-choice]');
  if (choice) {
    document.querySelectorAll('.choice[data-choice]').forEach(btn => btn.classList.remove('correct', 'wrong'));
    const feedback = document.getElementById('choiceFeedback');
    const feedbackText = document.getElementById('feedbackText');
    if (choice.dataset.choice === 'name') { choice.classList.add('correct'); feedbackText.textContent = 'Exactly. name is the label; “Alex” is the value inside the box.'; }
    else { choice.classList.add('wrong'); feedbackText.textContent = 'Not quite. Look for the label that points us to the stored value. You can try again — guessing is part of learning.'; }
    feedback.classList.add('visible');
    return;
  }

  const term = event.target.closest('[data-term-index]');
  if (term) {
    const [name, definition, type] = terms[Number(term.dataset.termIndex)];
    showModal(`<p class="modal-eyebrow">${type.split(' · ')[1] || 'glossary'}</p><h2>${name}</h2><p>${definition}</p><div class="analogy-box"><strong>Try this connection</strong><p>${name === 'Variable' ? 'If your backpack has a label that says “snacks,” the label is like a variable name.' : name === 'Value' ? 'If the snacks inside are two apples, “two apples” is the value.' : `Ask yourself: where might you notice ${name.toLowerCase()} in something you use every day?`}</p></div><div class="modal-actions"><button class="btn primary" data-modal-action="close">Makes sense ${icons.check}</button></div>`);
    return;
  }

  const modalAction = event.target.closest('[data-modal-action]')?.dataset.modalAction;
  if (modalAction === 'close') return closeModal();
  if (modalAction === 'practice') { closeModal(); render('lesson'); return; }
  if (modalAction === 'save-new-note') { const text = document.getElementById('newNoteText')?.value.trim(); closeModal(); showToast(text ? 'Your note was saved.' : 'Write a sentence first, then save it.'); return; }
  if (modalAction === 'show-coach') { showModal(`<p class="modal-eyebrow">A possible answer</p><h2>You’re building the connection.</h2><p>“A variable is like a labeled box: the label helps me find the information inside.”</p><div class="modal-actions"><button class="btn primary" data-modal-action="close">I understand ${icons.check}</button></div>`); return; }
  if (modalAction === 'context-answer') {
    const isCorrect = event.target.dataset.correct === 'true';
    event.target.classList.add(isCorrect ? 'correct' : 'wrong');
    const feedback = document.getElementById('contextFeedback');
    if (feedback) feedback.textContent = isCorrect ? 'Yes — booksRead tells us what the value means. A clear name is a helpful label.' : 'Try again. Choose a name that tells us what the stored number represents.';
  }
});

document.addEventListener('submit', event => {
  if (event.target.id !== 'askForm') return;
  event.preventDefault();
  const input = document.getElementById('askInput');
  const question = input.value.trim();
  if (!question) { input.focus(); return; }
  openQuestion(question);
  input.value = '';
});

document.addEventListener('input', event => {
  if (event.target.id === 'noteSearch') {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('.note-entry').forEach(note => { note.style.display = note.textContent.toLowerCase().includes(query) ? '' : 'none'; });
  }
  if (event.target.id === 'termSearch') {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('.term-card').forEach(term => { term.style.display = term.dataset.term.includes(query) ? '' : 'none'; });
  }
});

document.getElementById('modalClose').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', event => { if (event.target === modalBackdrop) closeModal(); });
document.getElementById('notificationBtn').addEventListener('click', () => showToast('You’re all caught up — nice work keeping your streak.'));
document.getElementById('feedbackBtn').addEventListener('click', () => showModal(`<p class="modal-eyebrow">Make Lumen better</p><h2>How is studying feeling?</h2><p>A sentence is plenty. Tell us what is helping or what feels confusing.</p><textarea placeholder="I like… / I wish…"></textarea><div class="modal-actions"><button class="btn" data-modal-action="close">Cancel</button><button class="btn primary" data-modal-action="send-feedback">Send feedback ${icons.arrow}</button></div>`));
document.addEventListener('click', event => { if (event.target.closest('[data-modal-action="send-feedback"]')) { closeModal(); showToast('Feedback sent. Thank you for helping.'); } });
document.querySelector('.mobile-menu').addEventListener('click', () => document.body.classList.toggle('nav-open'));

document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeModal(); document.body.classList.remove('nav-open'); } });

render('home');
