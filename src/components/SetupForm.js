import { useGlobalContext } from './context'
import Navbar from './Navbar'

const SetupForm = () => {
  const { quiz,handleChange,isError,handleSubmit } = useGlobalContext();
  return (
    <>
      <Navbar />
      <main>
        <section className="section-center quiz-small">
          <form className="search-form">
            <h2>setup quiz</h2>
            <div className="form-control">
              <label htmlFor="amount">Number of Questions:</label>
              <input
                type="number"
                name="amount"
                id="amout"
                className="search-input"
                value={quiz.amount}
                onChange={handleChange}
                min={1}
                max={50}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">select Category: </label>
              <select
                name="category"
                id="category"
                className="search-input"
                value={quiz.category}
                onChange={handleChange}
              >
                <option value="any type">any category</option>
                <option value="sports">sports</option>
                <option value="celebrities">celebrities</option>
                <option value="animals">animals</option>
                <option value="politics">politics</option>
                <option value="mythology">mythology</option>
                <option value="art">art</option>
                <option value="geography">geography</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="difficulty">select Difficulty: </label>
              <select
                name="difficulty"
                id="difficulty"
                className="search-input"
                value={quiz.difficulty}
                onChange={handleChange}
              >
                <option value="any type">any difficulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="type">select type: </label>
              <select
                name="type"
                id="type"
                className="search-input"
                value={quiz.type}
                onChange={handleChange}
              >
                <option value="any type">any type</option>
                <option value="multiple">multiple choice</option>
                <option value="boolean">true / false</option>
              </select>
            </div>
            {isError && (<p className="error">can't generate questions, please select another option</p>)}
            <button typ='submit' className="submit-btn" onClick={handleSubmit}>
              submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SetupForm
