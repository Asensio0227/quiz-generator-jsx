import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';


const table = {
  sports: 21,
  politics:24,
  mythology: 20,
  history: 23,
  art:25,
  geography: 22,
  animals: 27,
  celebrities:26,
}

const API_ENDPOINT = `https://opentdb.com/api.php?`;
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext();

const getLocalStorageQuiz = () => {
  let quiz = "quiz";
  if (localStorage.getItem('quiz')) {
    quiz = localStorage.getItem('quiz');
  }
  return quiz;
} 

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category:"sports",
    difficulty:"easy",
    type:"multiple",
  },
    getLocalStorageQuiz());
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuiz = async (venom) => {
    setIsLoading(true);
    setWaiting(false);
    const response = await axios(venom).catch((err) => console.log(err));
    console.log(response);
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        console.log(data);
        setWaiting(false);
        setIsLoading(false);
        setIsError(false);
      } else {
        setWaiting(true);
        setIsError(true);
      }
    } else {
      setWaiting(true); 
    }
  };
  
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const venom = oldIndex + 1;
      if (venom > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return venom;
      }
    })
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldIndex) => oldIndex + 1);
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setWaiting(false);
    setCorrect(0);
    setIsModalOpen(false);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questions);
    const { amount, category, difficulty, type } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=${type}`;
    fetchQuiz(url);
  }

  useEffect(() => {
    // document.documentElement.className = search - input;
    localStorage.setItem('quiz',quiz);
  },[])

  return (
    <AppContext.Provider value={{
      waiting,
      isLoading,
      questions,
      index,
      correct,
      isError,
      isModalOpen,
      nextQuestion,
      checkAnswer,
      closeModal,
      quiz, 
      handleChange,
      handleSubmit,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
