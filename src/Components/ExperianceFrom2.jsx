import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function ExperianceForm2() {

  const location = useLocation();
  const navigate = useNavigate();

  const experienceId = location.state?.experienceId;

  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: ""
    }
  ]);

  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "",
        answer: ""
      }
    ]);

  };

  const handleChange = (index, field, value) => {

    const data = [...questions];

    data[index][field] = value;

    setQuestions(data);

  };

  const submitQuestions = async () => {

    try {

      await api.post("/anonymous/question/save", {

        experienceId: experienceId,

        questions: questions

      });

      alert("Interview Experience Submitted Successfully");

      navigate("/Home");

    } catch (err) {

      console.log(err);

      alert("Failed to Save");

    }

  };

  return (

    <div
      className="modal d-block position-fixed top-0 start-0 w-100 h-100"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1050
      }}
    >

      <div className="modal-dialog modal-lg modal-dialog-centered">

        <div
          className="modal-content p-4 rounded-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)"
          }}
        >

          <h3 className="fw-bold mb-4">
            Interview Questions
          </h3>

          {questions.map((item, index) => (

            <div key={index} className="mb-4">

              <label className="fw-semibold">
                Question {index + 1}
              </label>

              <input
                type="text"
                className="form-control mb-2"
                value={item.question}
                onChange={(e) =>
                  handleChange(
                    index,
                    "question",
                    e.target.value
                  )
                }
              />

              <label className="fw-semibold">
                Answer
              </label>

              <textarea
                rows="3"
                className="form-control"
                value={item.answer}
                onChange={(e) =>
                  handleChange(
                    index,
                    "answer",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

          <button
            className="btn btn-link text-warning"
            onClick={addQuestion}
          >
            + Add Another
          </button>

          <div className="mt-4">

            <button
              className="btn btn-warning me-2"
              onClick={submitQuestions}
            >
              Submit
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/Home")}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ExperianceForm2;