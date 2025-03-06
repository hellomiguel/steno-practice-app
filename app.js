// Practice content
const practiceContent = {
  beginner: {
    common: [
      "the",
      "of",
      "and",
      "a",
      "to",
      "in",
      "is",
      "you",
      "that",
      "it",
      "he",
      "was",
      "for",
      "on",
      "are",
      "as",
      "with",
      "his",
      "they",
      "I",
      "at",
      "be",
      "this",
      "have",
      "from",
      "or",
      "one",
      "had",
      "by",
      "but",
      "what",
      "all",
      "were",
      "we",
      "when",
      "your",
      "can",
      "said",
      "there",
      "use",
    ],
    legal: [
      "court",
      "judge",
      "jury",
      "legal",
      "case",
      "law",
      "file",
      "claim",
      "brief",
      "motion",
      "party",
      "order",
      "trial",
      "right",
      "state",
      "argue",
      "admit",
      "sworn",
      "fact",
      "date",
      "rule",
      "time",
      "hear",
      "good",
      "plea",
      "side",
      "oral",
      "sign",
      "duty",
      "oath",
    ],
    numbers: [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "first",
      "second",
      "third",
      "once",
      "twice",
      "10",
      "20",
      "30",
      "40",
      "50",
      "100",
      "1,000",
      "half",
      "third",
      "quarter",
      "January",
      "March",
      "July",
      "August",
      "December",
    ],
  },
  intermediate: {
    common: [
      "because",
      "through",
      "between",
      "important",
      "different",
      "several",
      "government",
      "children",
      "knowledge",
      "information",
      "business",
      "together",
      "question",
      "experience",
      "education",
      "university",
      "community",
      "department",
      "development",
      "president",
      "available",
      "political",
      "especially",
      "sometimes",
      "everything",
      "understand",
      "particular",
      "certainly",
      "necessary",
      "situation",
    ],
    legal: [
      "plaintiff",
      "defendant",
      "testimony",
      "objection",
      "evidence",
      "counsel",
      "witness",
      "document",
      "pursuant",
      "deposition",
      "proceeding",
      "judgment",
      "attorney",
      "statement",
      "affidavit",
      "pursuant",
      "contract",
      "discovery",
      "testimony",
      "statute",
      "hearing",
      "subpoena",
      "argument",
      "settlement",
      "violation",
      "litigation",
      "precedent",
      "jurisdiction",
      "disclosure",
      "allegation",
    ],
    numbers: [
      "twenty-five",
      "seventy-three",
      "one hundred forty-two",
      "three thousand",
      "fifty-six percent",
      "four hundred eighty",
      "October 15, 2023",
      "June 7, 1998",
      "July 4, 1776",
      "March 14, 2024",
      "$1,250.75",
      "$498.62",
      "$10,000",
      "$2.5 million",
      "3:45 p.m.",
      "9:30 a.m.",
      "12:15 p.m.",
      "7:22 a.m.",
      "555-123-4567",
      "212-555-8901",
    ],
  },
  advanced: {
    common: [
      "notwithstanding",
      "simultaneously",
      "misrepresentation",
      "disproportionate",
      "characteristics",
      "infrastructure",
      "comprehensive",
      "representative",
      "extraordinary",
      "differentiation",
      "indistinguishable",
      "implementation",
      "accountability",
      "collaboration",
      "constitutional",
      "identification",
      "responsibility",
      "administrative",
      "classification",
      "recommendation",
    ],
    legal: [
      "notwithstanding the foregoing",
      "heretofore",
      "aforementioned",
      "jurisprudence",
      "indemnification",
      "cross-examination",
      "preponderance of evidence",
      "beyond reasonable doubt",
      "res judicata",
      "habeas corpus",
      "in limine",
      "pro se representation",
      "voir dire proceedings",
      "de novo review",
      "amicus curiae",
      "prima facie evidence",
      "breach of fiduciary duty",
      "motion for summary judgment",
      "abuse of discretion",
      "force majeure",
    ],
    numbers: [
      "electromagnetic spectrum",
      "gastroenterological",
      "orthopedic surgeon",
      "magnetic resonance imaging",
      "cardiovascular disease",
      "cerebrovascular accident",
      "osteoarthritis",
      "pharmaceutical intervention",
      "neurological examination",
      "hypercholesterolemia",
      "gastrointestinal endoscopy",
      "pulmonary embolism",
      "myocardial infarction",
      "electronystagmography",
      "immunoglobulin",
    ],
  },
};

// Testing phrases
const testingPhrases = {
  literary: [
    "The early morning fog rolled across the quiet lake, creating a mystical atmosphere that enveloped the surrounding forest.",
    "Despite numerous attempts to solve the complex problem, the team remained stumped until a fresh perspective emerged.",
    "Throughout history, great civilizations have risen and fallen, each leaving behind artifacts that tell their unique stories.",
  ],
  juryCharge: [
    "Ladies and gentlemen of the jury, you must consider all evidence presented during this trial and make your decision based solely on the facts.",
    "The burden of proof rests with the prosecution, who must demonstrate beyond reasonable doubt that the defendant committed the alleged crime.",
    "If you find that any witness has deliberately testified falsely about any material fact, you may disregard all or part of that witness's testimony.",
  ],
  testimony: [
    "Q: Can you describe what you observed on the evening of March 15th?\nA: Yes, I was returning home from work at approximately 8:30 p.m. when I noticed unusual activity near the building entrance.",
    "Q: And how long have you been employed at the company?\nA: I've worked there for nearly seven years, though my position has changed during that time.\nQ: Could you elaborate on those changes?\nA: Certainly. I started in accounting and was promoted to finance manager after three years.",
    "Q: Doctor, in your professional opinion, what caused these injuries?\nA: Based on my examination and the medical evidence, these injuries are consistent with a fall from significant height, not with the scenario described by the plaintiff.",
  ],
};

// Get DOM elements
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const difficultySelect = document.getElementById("difficulty");
const categorySelect = document.getElementById("category");
const wpmSlider = document.getElementById("wpm");
const wpmValue = document.getElementById("wpm-value");
const durationSlider = document.getElementById("duration");
const durationValue = document.getElementById("duration-value");
const muteToggle = document.getElementById("mute-toggle");
const resetBtn = document.getElementById("reset-btn");
const playBtn = document.getElementById("play-btn");
const skipBtn = document.getElementById("skip-btn");
const progressIndicator = document.getElementById("progress-indicator");
const timerDisplay = document.getElementById("timer");
const practiceDisplay = document.getElementById("practice-display");
const currentWordDisplay = document.getElementById("current-word");
const nextWordsContainer = document.getElementById("next-words");
const wpmMetric = document.getElementById("wpm-metric");
const wordsMetric = document.getElementById("words-metric");
const accuracyMetric = document.getElementById("accuracy-metric");
const resultsContainer = document.getElementById("results-container");
const resultDuration = document.getElementById("result-duration");
const resultWords = document.getElementById("result-words");
const resultWpm = document.getElementById("result-wpm");
const resultAccuracy = document.getElementById("result-accuracy");
const performanceText = document.getElementById("performance-text");
const beginTestBtn = document.getElementById("begin-test-btn");

// App state
let isPlaying = false;
let isMuted = false;
let elapsedTime = 0;
let totalTime = parseInt(durationSlider.value);
let practiceWpm = parseInt(wpmSlider.value);
let timerInterval = null;
let wordInterval = null;
let currentWords = [];
let wordsCompleted = 0;
let accuracy = 100;

// Local storage functions
function saveSettings() {
  const settings = {
    difficulty: difficultySelect.value,
    category: categorySelect.value,
    wpm: practiceWpm,
    duration: totalTime,
    isMuted: isMuted,
  };

  localStorage.setItem("stenoAppSettings", JSON.stringify(settings));
}

function loadSettings() {
  const savedSettings = localStorage.getItem("stenoAppSettings");
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    difficultySelect.value = settings.difficulty || "beginner";
    categorySelect.value = settings.category || "common";
    wpmSlider.value = settings.wpm || 60;
    wpmValue.textContent = settings.wpm || 60;
    practiceWpm = settings.wpm || 60;
    durationSlider.value = settings.duration || 60;
    durationValue.textContent = settings.duration || 60;
    totalTime = settings.duration || 60;
    muteToggle.checked = !settings.isMuted;
    isMuted = settings.isMuted;
  }
}

function saveProgress() {
  const progress = {
    lastSessionDate: new Date().toISOString(),
    totalWordsPracticed: wordsCompleted,
    highestWpm: Math.max(
      calculateWpm(),
      parseInt(localStorage.getItem("highestWpm") || 0)
    ),
    recentAccuracy: accuracy,
  };

  localStorage.setItem("stenoAppProgress", JSON.stringify(progress));
  localStorage.setItem("highestWpm", progress.highestWpm);
}

// Save settings when they change
difficultySelect.addEventListener("change", saveSettings);
categorySelect.addEventListener("change", saveSettings);
wpmSlider.addEventListener("change", saveSettings);
durationSlider.addEventListener("change", saveSettings);
muteToggle.addEventListener("change", saveSettings);

// Save progress when session ends
function endPracticeSession() {
  pausePracticeSession();
  skipBtn.disabled = true;

  // Save progress
  saveProgress();

  // Show results
  practiceDisplay.classList.add("hidden");
  resultsContainer.classList.remove("hidden");

  // Update results
  resultDuration.textContent = formatTime(elapsedTime);
  resultWords.textContent = wordsCompleted;
  resultWpm.textContent = calculateWpm();
  resultAccuracy.textContent = `${accuracy}%`;

  // Performance assessment
  const wpm = calculateWpm();
  if (wpm < 60) {
    performanceText.textContent =
      "Keep practicing! Try to build speed by focusing on common words and phrases.";
  } else if (wpm < 120) {
    performanceText.textContent =
      "Good progress! Continue working on pattern recognition and brief forms.";
  } else if (wpm < 180) {
    performanceText.textContent =
      "Great work! You're approaching professional speeds. Focus on maintaining accuracy.";
  } else {
    performanceText.textContent =
      "Excellent! You're performing at certification-level speeds. Keep refining your technique.";
  }
}

// Load settings and progress on page load
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  updateTimerDisplay();
});

function createTickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  return {
    play: function () {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
    },
  };
}

const tickSound = createTickSound();

// Tab switching
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach((content) => {
      content.classList.add("hidden");
      if (content.id === `${tabName}-tab`) {
        content.classList.remove("hidden");
      }
    });
  });
});

// Update displays for sliders
wpmSlider.addEventListener("input", () => {
  practiceWpm = parseInt(wpmSlider.value);
  wpmValue.textContent = practiceWpm;
});

durationSlider.addEventListener("input", () => {
  totalTime = parseInt(durationSlider.value);
  durationValue.textContent = totalTime;
  updateTimerDisplay();
});

// Mute toggle
muteToggle.addEventListener("change", () => {
  isMuted = !muteToggle.checked;
});

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Update timer display
function updateTimerDisplay() {
  timerDisplay.textContent = `${formatTime(elapsedTime)} / ${formatTime(
    totalTime
  )}`;
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate practice words
function generatePracticeWords() {
  const difficulty = difficultySelect.value;
  const category = categorySelect.value;
  return shuffleArray([...practiceContent[difficulty][category]]);
}

// Start practice session
function startPracticeSession() {
  // Reset states
  elapsedTime = 0;
  progressIndicator.style.width = "0%";
  isPlaying = true;

  // Update button states
  playBtn.innerHTML = "⏸";
  skipBtn.disabled = false;

  // Hide results, show practice display
  resultsContainer.classList.add("hidden");
  practiceDisplay.classList.remove("hidden");

  // Generate words
  currentWords = generatePracticeWords();
  wordsCompleted = 0;

  // Update displays
  updateWordDisplay();
  updateMetrics();

  // Start timer
  timerInterval = setInterval(() => {
    elapsedTime++;
    const progress = (elapsedTime / totalTime) * 100;
    progressIndicator.style.width = `${progress}%`;
    updateTimerDisplay();

    if (elapsedTime >= totalTime) {
      endPracticeSession();
    }
  }, 1000);

  // Start word display based on WPM
  const msPerWord = Math.floor(60000 / practiceWpm);
  wordInterval = setInterval(() => {
    if (currentWords.length > 0) {
      wordsCompleted++;
      currentWords.shift();

      if (currentWords.length > 0) {
        updateWordDisplay();
        updateMetrics();
        if (!isMuted) tickSound.play();
      } else {
        endPracticeSession();
      }
    }
  }, msPerWord);
}

// Pause practice session
function pausePracticeSession() {
  isPlaying = false;
  playBtn.innerHTML = "▶";

  clearInterval(timerInterval);
  clearInterval(wordInterval);
}

// End practice session
function endPracticeSession() {
  pausePracticeSession();
  skipBtn.disabled = true;

  // Show results
  practiceDisplay.classList.add("hidden");
  resultsContainer.classList.remove("hidden");

  // Update results
  resultDuration.textContent = formatTime(elapsedTime);
  resultWords.textContent = wordsCompleted;
  resultWpm.textContent = calculateWpm();
  resultAccuracy.textContent = `${accuracy}%`;

  // Performance assessment
  const wpm = calculateWpm();
  if (wpm < 60) {
    performanceText.textContent =
      "Keep practicing! Try to build speed by focusing on common words and phrases.";
  } else if (wpm < 120) {
    performanceText.textContent =
      "Good progress! Continue working on pattern recognition and brief forms.";
  } else if (wpm < 180) {
    performanceText.textContent =
      "Great work! You're approaching professional speeds. Focus on maintaining accuracy.";
  } else {
    performanceText.textContent =
      "Excellent! You're performing at certification-level speeds. Keep refining your technique.";
  }
}

// Update word display
function updateWordDisplay() {
  currentWordDisplay.textContent = currentWords[0] || "";

  // Update next words
  nextWordsContainer.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    if (currentWords[i]) {
      const wordSpan = document.createElement("span");
      wordSpan.className = "next-word";
      wordSpan.textContent = currentWords[i];
      nextWordsContainer.appendChild(wordSpan);
    }
  }
}

// Calculate WPM
function calculateWpm() {
  const minutes = elapsedTime / 60;
  return Math.round(wordsCompleted / (minutes || 0.01));
}

// Update metrics
function updateMetrics() {
  wpmMetric.textContent = calculateWpm();
  wordsMetric.textContent = `${wordsCompleted}/${
    wordsCompleted + currentWords.length
  }`;
  accuracyMetric.textContent = `${accuracy}%`;
}

// Reset practice session
function resetPracticeSession() {
  pausePracticeSession();
  elapsedTime = 0;
  progressIndicator.style.width = "0%";
  updateTimerDisplay();

  practiceDisplay.classList.add("hidden");
  resultsContainer.classList.add("hidden");
}

// Event listeners for control buttons
resetBtn.addEventListener("click", resetPracticeSession);

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pausePracticeSession();
  } else {
    if (
      resultsContainer.classList.contains("hidden") &&
      practiceDisplay.classList.contains("hidden")
    ) {
      startPracticeSession();
    } else if (!resultsContainer.classList.contains("hidden")) {
      resetPracticeSession();
      startPracticeSession();
    } else {
      startPracticeSession();
    }
  }
});

skipBtn.addEventListener("click", endPracticeSession);

// Add this after the existing functions

// Map from letters to steno key combinations
const letterToStenoMapping = {
  a: ["A"],
  b: ["P", "W"],
  c: ["K", "R"],
  d: ["T", "K"],
  e: ["E"],
  f: ["T", "P"],
  g: ["T", "K", "P", "W"],
  h: ["H"],
  i: ["E", "U"],
  j: ["S", "K", "W", "R"],
  k: ["K"],
  l: ["H", "R"],
  m: ["P", "H"],
  n: ["T", "P", "H"],
  o: ["O"],
  p: ["P"],
  q: ["K", "W"],
  r: ["R"],
  s: ["S"],
  t: ["T"],
  u: ["U"],
  v: ["S", "R"],
  w: ["W"],
  x: ["K", "P"],
  y: ["K", "W", "R"],
  z: ["S", "T", "K", "P", "W", "R"],
};

// Highlight steno keys for the current word
function highlightStenoKeys(word) {
  // Reset all keys
  const stenoKeys = document.querySelectorAll(".steno-key");
  stenoKeys.forEach((key) => key.classList.remove("active"));

  if (!word) return;

  // Convert word to lowercase
  const lowerWord = word.toLowerCase();

  // Highlight keys for the first letter only (simplified approach)
  if (lowerWord.length > 0) {
    const firstLetter = lowerWord[0];
    const keysToHighlight = letterToStenoMapping[firstLetter] || [];

    keysToHighlight.forEach((letter) => {
      const keys = document.querySelectorAll(
        `.steno-key[data-letter="${letter}"]`
      );
      keys.forEach((key) => key.classList.add("active"));
    });
  }
}

// Now modify the updateWordDisplay function to include highlighting
function updateWordDisplay() {
  const currentWord = currentWords[0] || "";
  currentWordDisplay.textContent = currentWord;
  highlightStenoKeys(currentWord);

  // Update next words
  nextWordsContainer.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    if (currentWords[i]) {
      const wordSpan = document.createElement("span");
      wordSpan.className = "next-word";
      wordSpan.textContent = currentWords[i];
      nextWordsContainer.appendChild(wordSpan);
    }
  }
}

// Initialize
updateTimerDisplay();
