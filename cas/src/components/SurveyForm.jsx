import React, { useState, useEffect } from "react";

const SurveyForm = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/survey")
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) => setError("Failed to fetch survey questions."));
  }, []);

  const handleResponseChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length !== questions.length) {
      setError("Please answer all the questions.");
      return;
    }

    fetch("/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful submission
        } else {
          setError("Failed to submit survey.");
        }
      })
      .catch((error) => setError("Failed to submit survey."));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <label>{question.text}</label>
          {question.type === "text" && (
            <input
              type="text"
              value={responses[question.id] || ""}
              onChange={(e) =>
                handleResponseChange(question.id, e.target.value)
              }
            />
          )}
          {question.type === "radio" && (
            <div>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    value={option}
                    checked={responses[question.id] === option}
                    onChange={() => handleResponseChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      {error && <p>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SurveyForm;
