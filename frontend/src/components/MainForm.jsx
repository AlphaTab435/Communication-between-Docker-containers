import { useState } from "react";

function MainForm() {
  const idKey = "_id";
  const questionKey = "Question";
  const optionKey = "Options";
  const categoryKey = "Category";
  const answerKey = "Answer";
  const userAnswerKey = "userAnswer";
  const [arr, setArr] = useState([]);
  const [score, setScore] = useState(0);
  const serverURI = "http://localhost:3000";
  // const arr = [
  //   {
  //     [idKey]: "65c86334edbc30e820656c3c",
  //     [questionKey]:
  //       "Which nerve primarily provides sensation to the palmar aspect of the thumb?",
  //     [optionKey]: [
  //       "A) Radial nerve",
  //       "B) Median nerve",
  //       "C) Ulnar nerve",
  //       "D) Dorsal nerve",
  //     ],
  //     [answerKey]: "B) Median nerve",
  //     [categoryKey]: "BASIC SCIENCES - Anatomy",
  //   },
  //   {
  //     [idKey]: "65c86334edbc30e820656c3d",
  //     [questionKey]: "The diaphragm is innervated by which nerve?",
  //     [optionKey]: [
  //       "A) Intercostal nerve",
  //       "B) Vagus nerve",
  //       "C) Phrenic nerve",
  //       "D) Accessory nerve",
  //     ],
  //     [answerKey]: "C) Phrenic nerve",
  //     [categoryKey]: "BASIC SCIENCES - Anatomy",
  //   },
  //   {
  //     [idKey]: "65c86334edbc30e820656c3e",
  //     [questionKey]:
  //       "Which anatomical structure connects the middle ear to the nasopharynx?",
  //     [optionKey]: [
  //       "A) Cochlear canal",
  //       "B) Semicircular canal",
  //       "C) Eustachian tube",
  //       "D) Auditory meatus",
  //     ],
  //     [answerKey]: "C) Eustachian tube",
  //     [categoryKey]: "BASIC SCIENCES - Anatomy",
  //   },
  //   {
  //     [idKey]: "65c86334edbc30e820656c3f",
  //     [questionKey]:
  //       "The sciatic nerve branches into which two primary nerves?",
  //     [optionKey]: [
  //       "A) Femoral and obturator",
  //       "B) Tibial and common peroneal",
  //       "C) Gluteal and pudendal",
  //       "D) Iliohypogastric and ilioinguinal",
  //     ],
  //     [answerKey]: "B) Tibial and common peroneal",
  //     [categoryKey]: "BASIC SCIENCES - Anatomy",
  //   },
  // ];

  const [selectedOptions, setSelectedOptions] = useState(
    // Array(arr.length).fill("")
    // arr.map((currItem, i) => {
    //   return {
    //     [idKey]: currItem[idKey],
    //     [questionKey]: currItem[questionKey],
    //     [userAnswerKey]: "",
    //   };
    // })
    []
  );

  const [questionsToDisplay, setQuestionsToDisplay] = useState(1);
  const [startQuiz, setStartQuiz] = useState(false);

  const handelStartQuiz = async () => {
    const response = await fetch(
      `${serverURI}/api/v1/mcqs/getMCQs:${questionsToDisplay}`
    );
    if (!response.ok) {
      console.log("Error At data Mcqs fetching");
      return;
    }
    const bodyData = await response.json();
    // console.log(bodyData);
    // console.log(typeof bodyData);
    // console.log(bodyData.data);
    // console.log(typeof bodyData.data);
    // console.log(bodyData.data[0]);
    // console.log(typeof bodyData.data[0]);

    setArr((prevState) => {
      setSelectedOptions((prevState) => {
        return bodyData.data.map((currItem, i) => {
          return {
            [idKey]: currItem[idKey],
            [questionKey]: currItem[questionKey],
            [userAnswerKey]: "",
          };
        });
      });
      setStartQuiz((prevState) => true);
      return bodyData.data;
    });
  };
  const handleQuestionsToDisplay = (e) => {
    setQuestionsToDisplay(+e.target.value);
  };
  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index][userAnswerKey] = value;
    setSelectedOptions(newSelectedOptions);
  };

  function hasEmptyValue(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i][key] && arr[i][key] !== 0) {
        return true;
      }
    }
    return false;
  }

  const hanndelSubmit = async (e) => {
    e.preventDefault();
    if (hasEmptyValue(selectedOptions, userAnswerKey)) {
      window.alert("Complete all MCQs before submission!");
      return;
    }
    const reponse = await fetch(`${serverURI}/api/v1/mcqs/submitMCQs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You can add more headers as needed
      },
      body: JSON.stringify({
        formData: selectedOptions,
      }),
    });

    const data = await reponse.json();
    console.log(data);
    setScore((pre) => Number(data.data));
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data); // Process response data
    // })
    // .catch((error) => {
    //   console.error("There was a problem with your fetch operation:", error);
    // });

    setStartQuiz((prevState) => false);
  };

  return (
    <>
      {startQuiz ? null : (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            gap: "20px",
          }}
        >
          <input
            type="range"
            id="points"
            name="points"
            min="1"
            max="50"
            value={questionsToDisplay}
            onChange={(e) => handleQuestionsToDisplay(e)}
          />
          <label htmlFor="points">{questionsToDisplay}</label>
        </div>
      )}

      {startQuiz ? null : (
        <div
          style={{
            margin: "4vh 0",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            // gap: "20px",
          }}
        >
          <input type="button" value="StartQuiz" onClick={handelStartQuiz} />
        </div>
      )}

      {startQuiz ? null : (
        <div
          style={{
            margin: "4vh 0",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            // gap: "20px",
          }}
        >
          Correct Answer in last attempt: {score}
        </div>
      )}

      {startQuiz ? (
        <form onSubmit={(e) => hanndelSubmit(e)}>
          {arr.map((item, i) => {
            console.log(item);
            return (
              <div key={item[idKey]}>
                <br />
                <textarea
                  name={`q${i + 1}`}
                  type="text"
                  disabled={true}
                  value={item[questionKey]}
                  style={{
                    resize: "none",
                    width: "60dvw",
                    padding: "5px",
                    margin: "5px 0",
                  }}
                />
                {item[optionKey].map((option, j) => {
                  return (
                    <div key={`${item[idKey]}_${j}`}>
                      <br />
                      <input
                        type="radio"
                        id={`q${i + 1}o${j + 1}`}
                        name={`q${i + 1}o`}
                        value={option}
                        checked={selectedOptions[i][userAnswerKey] === option}
                        onChange={() => handleOptionChange(i, option)}
                      />
                      <label htmlFor={`q${i + 1}o${j + 1}`}>{option}</label>
                      <br />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <br />
          <div
            style={{
              justifyContent: "end",
              alignItems: "center",
              display: "flex",
            }}
          >
            <input type="submit" value="Submit" />
          </div>
        </form>
      ) : null}
    </>
  );
}

export default MainForm;
