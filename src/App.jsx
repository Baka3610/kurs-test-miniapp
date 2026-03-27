import React, { useEffect, useMemo, useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    text: 'Когда ты думаешь о важной задаче, которая может повлиять на твою жизнь?',
    options: [
      { text: 'Начинаю делать что-то другое, лишь бы не думать об этом', type: 'chaos' },
      { text: 'Открываю телефон или отвлекаюсь', type: 'dopamine' },
      { text: 'Долго прокручиваю в голове, но не начинаю', type: 'fear' },
      { text: 'Понимаю, что надо делать, но откладываю на потом', type: 'potential' },
    ],
  },
  {
    id: 2,
    text: 'Что ты чаще всего чувствуешь, когда нужно сесть и сосредоточиться?',
    options: [
      { text: 'Внутренний хаос и разбросанность', type: 'chaos' },
      { text: 'Тягу к чему-то более лёгкому и приятному', type: 'dopamine' },
      { text: 'Напряжение и страх сделать неправильно', type: 'fear' },
      { text: 'Сопротивление, но без явной причины', type: 'potential' },
    ],
  },
  {
    id: 3,
    text: 'Когда ты всё-таки начинаешь работать?',
    options: [
      { text: 'Быстро перескакиваю между задачами', type: 'chaos' },
      { text: 'Через время теряю концентрацию и отвлекаюсь', type: 'dopamine' },
      { text: 'Постоянно сомневаюсь в том, что делаю', type: 'fear' },
      { text: 'Могу работать, но не долго и нестабильно', type: 'potential' },
    ],
  },
  {
    id: 4,
    text: 'Если у тебя что-то не получается:',
    options: [
      { text: 'Бросаю и переключаюсь на другое', type: 'chaos' },
      { text: 'Ухожу в отвлечения (телефон, видео, соцсети)', type: 'dopamine' },
      { text: 'Начинаю себя критиковать и торможу', type: 'fear' },
      { text: 'Продолжаю, но с потерей энергии', type: 'potential' },
    ],
  },
  {
    id: 5,
    text: 'Как ты обычно принимаешь решение начать что-то новое?',
    options: [
      { text: 'Импульсивно, но быстро теряю интерес', type: 'chaos' },
      { text: 'Если это кажется лёгким и быстрым', type: 'dopamine' },
      { text: 'Только если уверен, что получится хорошо', type: 'fear' },
      { text: 'Откладываю, даже если понимаю, что надо', type: 'potential' },
    ],
  },
  {
    id: 6,
    text: 'Твои мысли во время работы чаще:',
    options: [
      { text: 'Хаотичные, перескакивают с одного на другое', type: 'chaos' },
      { text: 'Тянут к чему-то более простому и интересному', type: 'dopamine' },
      { text: '«А вдруг я делаю неправильно»', type: 'fear' },
      { text: '«Надо бы делать, но не хочется»', type: 'potential' },
    ],
  },
  {
    id: 7,
    text: 'Когда ты смотришь на людей, которые добиваются результата:',
    options: [
      { text: 'Кажется, что у них просто больше энергии', type: 'chaos' },
      { text: 'Думаешь, что они не отвлекаются как ты', type: 'dopamine' },
      { text: 'Кажется, что они лучше и умнее тебя', type: 'fear' },
      { text: 'Понимаешь, что ты тоже можешь, но не делаешь', type: 'potential' },
    ],
  },
  {
    id: 8,
    text: 'Что больше всего описывает твою главную проблему?',
    options: [
      { text: 'Я не могу собрать себя в одну точку', type: 'chaos' },
      { text: 'Я постоянно отвлекаюсь', type: 'dopamine' },
      { text: 'Я боюсь делать неправильно', type: 'fear' },
      { text: 'Я не довожу до стабильного результата', type: 'potential' },
    ],
  },
];

const RESULTS = {
  chaos: {
    title: 'Твой тип: РАСФОКУСИРОВАННЫЙ (ХАОС)',
    subtitle: 'Ты не держишь внимание и теряешь энергию на постоянных переключениях.',
    bullets: [
      'Ты хватаешься за всё сразу и редко доводишь до конца.',
      'Тебе не хватает структуры, опоры и понятного ритма.',
      'Твоя первая задача — убрать шум и вернуть контроль над днём.',
    ],
    next: 'Тебе подойдёт система, которая сначала наводит порядок в голове и окружении, а уже потом усиливает дисциплину.',
  },
  dopamine: {
    title: 'Твой тип: ДОФАМИН-ЗАВИСИМЫЙ',
    subtitle: 'Мозг привык к быстрым стимулам и сопротивляется глубокой концентрации.',
    bullets: [
      'Тебя легко уводят телефон, соцсети и короткий контент.',
      'Сложные задачи кажутся слишком тяжёлыми на фоне быстрых удовольствий.',
      'Твоя первая задача — снизить шум и заново натренировать внимание.',
    ],
    next: 'Тебе подойдёт система мягкой перестройки привычек, чтобы снова научиться держать фокус без насилия над собой.',
  },
  fear: {
    title: 'Твой тип: ПЕРФЕКЦИОНИСТ (СТРАХ ОШИБОК)',
    subtitle: 'Ты можешь многое, но тормозишь себя страхом ошибок и внутренней оценкой.',
    bullets: [
      'Ты часто откладываешь не из-за лени, а из-за страха сделать плохо.',
      'Твой мозг выбирает бездействие, чтобы избежать неприятных эмоций.',
      'Твоя первая задача — научиться действовать до уверенности, а не после неё.',
    ],
    next: 'Тебе подойдёт система маленьких действий, которая снижает страх и переводит тебя из мыслей в реальные шаги.',
  },
  potential: {
    title: 'Твой тип: ПОТЕНЦИАЛ БЕЗ СИСТЕМЫ',
    subtitle: 'У тебя уже есть база, но без системы ты не превращаешь её в стабильный результат.',
    bullets: [
      'Ты умеешь работать, но делаешь это неровно.',
      'Тебе не хватает ритма, среды и повторяемых шагов.',
      'Твоя первая задача — собрать личную систему фокуса и дисциплины.',
    ],
    next: 'Тебе подойдёт система, которая превращает разовые усилия в устойчивую привычку и рост.',
  },
};

function getTopType(answers) {
  const score = {
    chaos: 0,
    dopamine: 0,
    fear: 0,
    potential: 0,
  };

  answers.forEach((type) => {
    score[type] += 1;
  });

  const priority = ['fear', 'dopamine', 'chaos', 'potential'];

  return Object.entries(score).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return priority.indexOf(a[0]) - priority.indexOf(b[0]);
  })[0][0];
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, #1b1d26 0%, #0b0d12 42%, #06070a 100%)',
    color: '#f5f7fb',
    padding: '20px 16px 28px',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
  },
  hero: {
    marginBottom: '18px',
    padding: '22px 20px',
    borderRadius: '28px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.82)',
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '14px',
  },
  title: {
    fontSize: '26px',
    lineHeight: 1.15,
    fontWeight: 800,
    margin: '0 0 10px 0',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.74)',
    margin: 0,
  },
  progressRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    color: 'rgba(255,255,255,0.66)',
    fontSize: '13px',
    fontWeight: 600,
  },
  progressWrap: {
    width: '100%',
    height: '10px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '18px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, #ffffff 0%, #b8c2ff 100%)',
    transition: 'width 220ms ease',
  },
  card: {
    borderRadius: '30px',
    padding: '22px 18px 18px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.32)',
  },
  sectionLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: '10px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  questionTitle: {
    margin: '0 0 18px 0',
    fontSize: '20px',
    lineHeight: 1.35,
    fontWeight: 750,
    letterSpacing: '-0.02em',
  },
  optionButton: {
    width: '100%',
    textAlign: 'left',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: '#f4f6fb',
    padding: '16px',
    marginBottom: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: 1.45,
    fontWeight: 500,
  },
  optionHint: {
    display: 'block',
    marginTop: '6px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.44)',
  },
  resultTitle: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    lineHeight: 1.18,
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  resultSubtitle: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.74)',
    margin: '0 0 18px 0',
  },
  bulletCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    padding: '14px',
    marginBottom: '10px',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  nextCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #e7ebff 100%)',
    color: '#101320',
    borderRadius: '22px',
    padding: '16px',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: 1.55,
    marginBottom: '14px',
  },
  footerText: {
    fontSize: '13px',
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.58)',
    marginBottom: '14px',
  },
  secondaryButton: {
    width: '100%',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#f4f6fb',
    padding: '14px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '10px',
  },
  primaryButton: {
    width: '100%',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(135deg, #ffffff 0%, #dbe2ff 100%)',
    color: '#0f1320',
    padding: '15px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 800,
  },
};

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      setIsTelegram(true);
      tg.ready();
      tg.expand();
    }
  }, []);

  const resultType = useMemo(() => {
    if (answers.length !== QUESTIONS.length) return null;
    return getTopType(answers);
  }, [answers]);

  const currentQuestion = QUESTIONS[step];
  const progress = Math.round((answers.length / QUESTIONS.length) * 100);

  const handleAnswer = (type) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  const goBackToBot = () => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.close();
    }
  };

  if (resultType) {
    const result = RESULTS[resultType];

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <div style={styles.badge}>Результат теста</div>
            <h1 style={styles.resultTitle}>{result.title}</h1>
            <p style={styles.resultSubtitle}>{result.subtitle}</p>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionLabel}>Что это значит</div>

            <div style={{ marginBottom: '16px' }}>
              {result.bullets.map((item) => (
                <div key={item} style={styles.bulletCard}>
                  {item}
                </div>
              ))}
            </div>

            <div style={styles.nextCard}>{result.next}</div>

            <div style={styles.footerText}>
              {isTelegram
                ? 'Нажми кнопку ниже, чтобы закрыть тест и вернуться в бота.'
                : 'Если ты открыл это вне Telegram, можно пройти тест заново.'}
            </div>

            <button onClick={goBackToBot} style={styles.primaryButton}>
              Вернуться в бота
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>Психологический тест · 2–3 минуты</div>
          <h1 style={styles.title}>Почему тебе трудно держать фокус?</h1>
          <p style={styles.subtitle}>
            Ответь честно на 8 вопросов. В конце ты узнаешь свой тип и поймёшь, что именно мешает
            тебе концентрироваться и двигаться вперёд.
          </p>
        </div>

        <div style={styles.progressRow}>
          <span>
            Вопрос {currentQuestion.id} из {QUESTIONS.length}
          </span>
          <span>{progress}%</span>
        </div>

        <div style={styles.progressWrap}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>

        <div style={styles.card}>
          <div style={styles.sectionLabel}>Выбери вариант, который ближе всего</div>
          <h2 style={styles.questionTitle}>{currentQuestion.text}</h2>

          <div>
            {currentQuestion.options.map((option) => (
              <button
                key={option.text}
                onClick={() => handleAnswer(option.type)}
                style={styles.optionButton}
              >
                {option.text}
                <span style={styles.optionHint}>Нажми, чтобы перейти к следующему вопросу</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}