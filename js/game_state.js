/* ============================================================
   GAME STATE: XP, Levels, Streaks, Achievements, Daily Challenges
   ============================================================ */
const GameState = (() => {
  const STORAGE_KEY = 'math_hero_game_state';
  const STREAK_KEY = 'math_hero_streak';

  /* ---- Defaults ---- */
  const DEFAULT_STATE = {
    xp: 0,
    level: 1,
    totalProblemsCorrect: 0,
    totalProblemsAttempted: 0,
    totalTimeSpent: 0,
    streakDays: 0,
    lastActiveDate: null,
    currentSessionCorrect: 0,
    currentSessionAttempted: 0,
    currentStreak: 0, // consecutive correct answers
    bestStreak: 0,
    achievements: {},
    dailyChallengeCompleted: {},
    modeStats: {
      learn: { completed: 0, xpEarned: 0 },
      practice: { correct: 0, attempted: 0, xpEarned: 0 },
      challenge: { completed: 0, xpEarned: 0 },
      speedDrill: { bestWpm: 0, totalDrills: 0, xpEarned: 0 },
    },
    topicMastery: {} // topicId -> { score: 0-100, problemsSolved: N }
  };

  let state = {};

  /* ---- Level Thresholds ---- */
  const LEVEL_THRESHOLDS = [
    0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200,
    6600, 8200, 10000, 12000, 14500, 17500, 21000, 25000, 30000, 36000,
    43000, 51000, 60000, 70000, 82000, 95000, 110000, 130000, 155000, 185000
  ];

  const LEVEL_TITLES = [
    'Novice', 'Learner', 'Student', 'Scholar', 'Adept',
    'Practitioner', 'Specialist', 'Expert', 'Master', 'Grandmaster',
    'Sage', 'Mathematician', 'Theorist', 'Professor', 'Genius',
    'Luminary', 'Prodigy', 'Virtuoso', 'Legend', 'Archon',
    'Transcendent', 'Infinity', 'Omega', 'Aleph', 'Euler',
    'Gauss', 'Riemann', 'Ramanujan', 'Newton', 'Absolute Zero'
  ];

  /* ---- XP Rewards ---- */
  const XP_REWARDS = {
    mcqCorrect: 10,
    mcqCorrectHard: 25,
    mcqCorrectMedium: 15,
    freeResponseCorrect: 20,
    freeResponseHard: 40,
    stepByStepComplete: 30,
    challengeComplete: 50,
    challengeChainComplete: 150,
    drillProblem: 5,
    drillBonusSpeed: 15,
    drillPerfectRound: 50,
    dailyChallengeComplete: 100,
    proofComplete: 60,
    matchingComplete: 15,
    streakBonus3: 20,
    streakBonus5: 50,
    streakBonus10: 120,
    streakBonus25: 300,
    topicMastery: 200,
    firstCorrect: 5,
  };

  /* ---- Achievement Definitions ---- */
  const ACHIEVEMENTS = {
    first_blood: { title: 'First Blood', desc: 'Solve your first problem', icon: '🎯', condition: s => s.totalProblemsCorrect >= 1 },
    streak_3: { title: 'Hat Trick', desc: '3 correct in a row', icon: '🔥', condition: s => s.bestStreak >= 3 },
    streak_5: { title: 'On Fire', desc: '5 correct in a row', icon: '🔥🔥', condition: s => s.bestStreak >= 5 },
    streak_10: { title: 'Unstoppable', desc: '10 correct in a row', icon: '💥', condition: s => s.bestStreak >= 10 },
    streak_25: { title: 'Legendary Streak', desc: '25 correct in a row', icon: '⚡', condition: s => s.bestStreak >= 25 },
    problems_10: { title: 'Getting Started', desc: 'Solve 10 problems', icon: '📝', condition: s => s.totalProblemsCorrect >= 10 },
    problems_50: { title: 'Dedicated', desc: 'Solve 50 problems', icon: '💪', condition: s => s.totalProblemsCorrect >= 50 },
    problems_100: { title: 'Centurion', desc: 'Solve 100 problems', icon: '🏅', condition: s => s.totalProblemsCorrect >= 100 },
    problems_500: { title: 'Marathon Runner', desc: 'Solve 500 problems', icon: '🏆', condition: s => s.totalProblemsCorrect >= 500 },
    problems_1000: { title: 'Thousand Club', desc: 'Solve 1000 problems', icon: '👑', condition: s => s.totalProblemsCorrect >= 1000 },
    level_5: { title: 'Adept', desc: 'Reach Level 5', icon: '⭐', condition: s => s.level >= 5 },
    level_10: { title: 'Master', desc: 'Reach Level 10', icon: '🌟', condition: s => s.level >= 10 },
    level_20: { title: 'Transcendent', desc: 'Reach Level 20', icon: '✨', condition: s => s.level >= 20 },
    speed_demon: { title: 'Speed Demon', desc: 'Complete a speed drill with 100% accuracy', icon: '⚡', condition: s => s.modeStats?.speedDrill?.totalDrills >= 1 },
    challenge_1: { title: 'Challenger', desc: 'Complete your first challenge', icon: '🧩', condition: s => s.modeStats?.challenge?.completed >= 1 },
    challenge_10: { title: 'Puzzle Master', desc: 'Complete 10 challenges', icon: '🧠', condition: s => s.modeStats?.challenge?.completed >= 10 },
    daily_3: { title: 'Consistent', desc: 'Complete 3 daily challenges', icon: '📅', condition: s => Object.keys(s.dailyChallengeCompleted || {}).length >= 3 },
    daily_7: { title: 'Weekly Warrior', desc: 'Complete 7 daily challenges', icon: '🗓️', condition: s => Object.keys(s.dailyChallengeCompleted || {}).length >= 7 },
    mastery_1: { title: 'Topic Master', desc: 'Master your first topic (100%)', icon: '🎓', condition: s => Object.values(s.topicMastery || {}).some(t => t.score >= 100) },
    accuracy_90: { title: 'Sharpshooter', desc: 'Maintain 90%+ accuracy over 50+ problems', icon: '🎯', condition: s => s.totalProblemsAttempted >= 50 && (s.totalProblemsCorrect / s.totalProblemsAttempted) >= 0.9 },
    streak_days_3: { title: 'Three Day Streak', desc: 'Practice 3 days in a row', icon: '📆', condition: s => s.streakDays >= 3 },
    streak_days_7: { title: 'Weekly Habit', desc: 'Practice 7 days in a row', icon: '🔄', condition: s => s.streakDays >= 7 },
    streak_days_30: { title: 'Monthly Dedication', desc: 'Practice 30 days in a row', icon: '🏋️', condition: s => s.streakDays >= 30 },
  };

  /* ---- Init ---- */
  function init() {
    load();
    updateDayStreak();
  }

  function load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      state = data ? { ...DEFAULT_STATE, ...JSON.parse(data) } : { ...DEFAULT_STATE };
    } catch (e) {
      state = { ...DEFAULT_STATE };
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* silent */ }
  }

  /* ---- Day Streak ---- */
  function updateDayStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastActiveDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.lastActiveDate === yesterday) {
      state.streakDays++;
    } else if (state.lastActiveDate !== today) {
      state.streakDays = 1;
    }
    state.lastActiveDate = today;
    save();
  }

  /* ---- XP & Leveling ---- */
  function addXP(amount, source) {
    // Apply streak multiplier
    let multiplier = 1;
    if (state.currentStreak >= 25) multiplier = 2.0;
    else if (state.currentStreak >= 10) multiplier = 1.5;
    else if (state.currentStreak >= 5) multiplier = 1.25;
    else if (state.currentStreak >= 3) multiplier = 1.1;

    const xpGained = Math.round(amount * multiplier);
    state.xp += xpGained;

    // Check level up
    const oldLevel = state.level;
    while (state.level < LEVEL_THRESHOLDS.length && state.xp >= LEVEL_THRESHOLDS[state.level]) {
      state.level++;
    }

    if (state.level > oldLevel) {
      showLevelUp(state.level);
    }

    // Update mode stats
    if (source && state.modeStats[source]) {
      state.modeStats[source].xpEarned = (state.modeStats[source].xpEarned || 0) + xpGained;
    }

    save();
    checkAchievements();
    return xpGained;
  }

  function getXPForNextLevel() {
    if (state.level >= LEVEL_THRESHOLDS.length) return Infinity;
    return LEVEL_THRESHOLDS[state.level] - state.xp;
  }

  function getXPProgress() {
    if (state.level >= LEVEL_THRESHOLDS.length) return 100;
    const prevThreshold = state.level > 0 ? LEVEL_THRESHOLDS[state.level - 1] : 0;
    const nextThreshold = LEVEL_THRESHOLDS[state.level];
    const progress = ((state.xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
    return Math.min(100, Math.max(0, progress));
  }

  /* ---- Problem Tracking ---- */
  function recordCorrectAnswer(difficulty, type, topicId) {
    state.totalProblemsCorrect++;
    state.totalProblemsAttempted++;
    state.currentSessionCorrect++;
    state.currentSessionAttempted++;
    state.currentStreak++;
    if (state.currentStreak > state.bestStreak) {
      state.bestStreak = state.currentStreak;
    }

    // XP by type and difficulty
    let xp = XP_REWARDS.mcqCorrect;
    if (type === 'freeResponse') xp = difficulty === 'hard' ? XP_REWARDS.freeResponseHard : XP_REWARDS.freeResponseCorrect;
    else if (type === 'stepByStep') xp = XP_REWARDS.stepByStepComplete;
    else if (type === 'challenge') xp = XP_REWARDS.challengeComplete;
    else if (type === 'proof') xp = XP_REWARDS.proofComplete;
    else if (type === 'matching') xp = XP_REWARDS.matchingComplete;
    else if (type === 'drill') xp = XP_REWARDS.drillProblem;
    else if (difficulty === 'hard') xp = XP_REWARDS.mcqCorrectHard;
    else if (difficulty === 'medium') xp = XP_REWARDS.mcqCorrectMedium;

    // Streak bonuses
    if (state.currentStreak === 3) xp += XP_REWARDS.streakBonus3;
    if (state.currentStreak === 5) xp += XP_REWARDS.streakBonus5;
    if (state.currentStreak === 10) xp += XP_REWARDS.streakBonus10;
    if (state.currentStreak === 25) xp += XP_REWARDS.streakBonus25;

    // Topic mastery
    if (topicId) {
      if (!state.topicMastery[topicId]) state.topicMastery[topicId] = { score: 0, problemsSolved: 0 };
      state.topicMastery[topicId].problemsSolved++;
      const newScore = Math.min(100, state.topicMastery[topicId].score + (difficulty === 'hard' ? 10 : difficulty === 'medium' ? 6 : 3));
      if (newScore >= 100 && state.topicMastery[topicId].score < 100) {
        xp += XP_REWARDS.topicMastery;
      }
      state.topicMastery[topicId].score = newScore;
    }

    const xpGained = addXP(xp, type === 'drill' ? 'speedDrill' : 'practice');
    save();
    return { xpGained, streak: state.currentStreak, bestStreak: state.bestStreak };
  }

  function recordWrongAnswer() {
    state.totalProblemsAttempted++;
    state.currentSessionAttempted++;
    state.currentStreak = 0;
    save();
    return { streak: 0 };
  }

  function recordChallengeComplete() {
    state.modeStats.challenge.completed++;
    const xp = addXP(XP_REWARDS.challengeChainComplete, 'challenge');
    save();
    return xp;
  }

  function recordDrillComplete(correct, total, timeSeconds) {
    state.modeStats.speedDrill.totalDrills++;
    const wpm = total > 0 ? Math.round((correct / (timeSeconds/60))) : 0;
    if (wpm > (state.modeStats.speedDrill.bestWpm || 0)) {
      state.modeStats.speedDrill.bestWpm = wpm;
    }

    let xp = correct * XP_REWARDS.drillProblem;
    if (correct === total && total >= 5) xp += XP_REWARDS.drillPerfectRound;
    if (timeSeconds < 60 && correct >= 10) xp += XP_REWARDS.drillBonusSpeed;
    addXP(xp, 'speedDrill');
    save();
    return { wpm, xp };
  }

  function recordDailyChallenge() {
    const today = new Date().toISOString().slice(0, 10);
    state.dailyChallengeCompleted[today] = true;
    addXP(XP_REWARDS.dailyChallengeComplete, 'practice');
    save();
  }

  /* ---- Achievements ---- */
  function checkAchievements() {
    const newAchievements = [];
    for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
      if (!state.achievements[id] && ach.condition(state)) {
        state.achievements[id] = { unlockedAt: Date.now() };
        newAchievements.push(ach);
        showAchievement(ach);
      }
    }
    if (newAchievements.length > 0) save();
    return newAchievements;
  }

  /* ---- UI Notifications ---- */
  function showLevelUp(level) {
    const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
    showGameToast(`🎉 Level Up! Level ${level}: ${title}`, 'level-up');
  }

  function showAchievement(ach) {
    showGameToast(`${ach.icon} Achievement: ${ach.title}`, 'achievement');
  }

  function showXPGain(amount) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${amount} XP`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 1500);
  }

  function showGameToast(message, type) {
    let container = document.getElementById('game-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'game-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `game-toast ${type || ''}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ---- Streak Display ---- */
  function getStreakEmoji() {
    const s = state.currentStreak;
    if (s >= 25) return '🔥🔥🔥';
    if (s >= 10) return '🔥🔥';
    if (s >= 5) return '🔥';
    if (s >= 3) return '✨';
    return '';
  }

  /* ---- Public Getters ---- */
  function getState() { return { ...state }; }
  function getLevel() { return state.level; }
  function getLevelTitle() { return LEVEL_TITLES[Math.min(state.level - 1, LEVEL_TITLES.length - 1)]; }
  function getXP() { return state.xp; }
  function getStreak() { return state.currentStreak; }
  function getBestStreak() { return state.bestStreak; }
  function getStreakDays() { return state.streakDays; }
  function getAccuracy() {
    return state.totalProblemsAttempted > 0
      ? Math.round((state.totalProblemsCorrect / state.totalProblemsAttempted) * 100)
      : 0;
  }
  function getAchievements() { return { ...ACHIEVEMENTS }; }
  function getUnlockedAchievements() { return { ...state.achievements }; }
  function getTopicMastery(topicId) { return state.topicMastery[topicId] || { score: 0, problemsSolved: 0 }; }
  function isDailyChallengeComplete() {
    const today = new Date().toISOString().slice(0, 10);
    return !!state.dailyChallengeCompleted[today];
  }

  return {
    init, load, save, getState,
    addXP, getXPForNextLevel, getXPProgress,
    recordCorrectAnswer, recordWrongAnswer, recordChallengeComplete,
    recordDrillComplete, recordDailyChallenge,
    checkAchievements, showXPGain, showGameToast,
    getLevel, getLevelTitle, getXP, getStreak, getBestStreak,
    getStreakDays, getAccuracy, getStreakEmoji,
    getAchievements, getUnlockedAchievements, getTopicMastery,
    isDailyChallengeComplete, XP_REWARDS, LEVEL_TITLES
  };
})();
