import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const grid = [
  "(1, 1)", "(2, 1)", "(3, 1)",
  "(1, 2)", "(2, 2)", "(3, 2)",
  "(1, 3)", "(2, 3)", "(3, 3)",
]


export default function AppFunctional(props) {
  const [values, setValues] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
  })

  function reset() {
    // Use this helper to reset all states to their initial values.
    setValues({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    })
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction == "left") {
      if (values.index == 0 || values.index == 3 || values.index == 6) {
        setValues({
          ...values,
          ["message"]: ("You can't go left")
        })

        return
      }
    } else if (direction == "up") {
      if (values.index == 0 || values.index == 1 || values.index == 2) {
        setValues({
          ...values,
          ["message"]: ("You can't go up")
        })

        return
      }
    } else if (direction == "right") {
      if (values.index == 2 || values.index == 5 || values.index == 8) {
        setValues({
          ...values,
          ["message"]: ("You can't go right")
        })

        return
      }
    } else if (direction == "down") {
      if (values.index == 6 || values.index == 7 || values.index == 8) {
        setValues({
          ...values,
          ["message"]: ("You can't go down")
        })

        return
      }
    }

    move(direction)
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let index;
    if (evt == "left") {
      index = (values.index - 1)
    } else if (evt == "up") {
      index = (values.index - 3)
    } else if (evt == "right") {
      index = (values.index + 1)
    } else if (evt == "down") {
      index = (values.index + 3)
    }

    setValues({
      ...values,
      ["index"]: index,
      ["message"]: "",
      ["steps"]: (values.steps + 1),
    })

  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    //console.log(evt.target.id)
    if (evt.target.id == "email") {
      //console.log(evt, evt.target.inputValue)
      setValues({
        ...values,
        ["email"]: evt.target.value
      })
    } else {
      getNextIndex(evt.target.id)
    }
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    // console.log(evt, state.email)

    if (values.email != "" && values.email != undefined) {
      axios.post("http://localhost:9000/api/result", {
        "x": Array.from(grid[values.index])[1],
        "y": Array.from(grid[values.index])[4],
        "steps": values.steps,
        "email": values.email,
      }).then(val => {
        // console.log("success")
        //  console.log(val)
        setValues({
          ...values,
          ["message"]: val.data.message
        })
      }).catch(err => {
        console.log(err)
        setValues({
          ...values,
          ["message"]: val.data.message
        })
      })
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {grid[values.index]}</h3>
        <h3 id="steps">You moved {values.steps} {values.steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === values.index ? ' active' : ''}`}>
              {idx === values.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{values.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={onChange} id="left">LEFT</button>
        <button onClick={onChange} id="up">UP</button>
        <button onClick={onChange} id="right">RIGHT</button>
        <button onClick={onChange} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form >
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
