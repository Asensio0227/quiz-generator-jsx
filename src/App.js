import React from 'react' 
import Navbar from './components/Navbar';
import SetupForm from './components/SetupForm';
import { useGlobalContext } from './components/context';
import Loading from './components/Loading'
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const {
    waiting,
    isLoading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer
  } = useGlobalContext();
  
  if (waiting) {
    return (
      <SetupForm/>
    )
  }

  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const tempAnswers = Math.floor(Math.random() * 4);
  if (tempAnswers === 3) {
    answers.push(answers[correct_answer]);
  } else {
    answers.push(answers[tempAnswers]);
    answers[tempAnswers] = correct_answer;
  }

  return (
    <>
      <Navbar />
      <main>
        <Modal />
        <section className="section-center quiz-small">
          <p className="correct-answer">
            correct answer: {correct}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className="answer-btn"
                    onClick={() => checkAnswer(correct_answer === answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                )
              })}
            </div>
          </article>
          <button className="question-btn" onClick={nextQuestion}>
            next question
          </button>
        </section>
      </main>
    </>
  );
};

export default App;
