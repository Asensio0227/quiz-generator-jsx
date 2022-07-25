import { useGlobalContext } from './context'
import Navbar from './Navbar'

const SetupForm = () => {
  const { quiz,changeHandler,isError,handleSubmit } = useGlobalContext();
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
                onChange={changeHandler}
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
                onChange={changeHandler}
              >
                <option value="sports">sports</option>
                <option value="celebrities">celebrities</option>
                <option value="animal">animal</option>
                <option value="politics">politics</option>
                <option value="Mythology">Mythology</option>
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
                onChange={changeHandler}
              >
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
                onChange={changeHandler}
              >
                <option value="any type">any type</option>
                <option value="multiply choice">multiply choice</option>
                <option value="true/false">ture/false</option>
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
