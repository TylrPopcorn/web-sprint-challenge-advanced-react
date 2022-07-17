import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ""
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

const grid = [
  "(1, 1)", "(2, 1)", "(3, 1)",
  "(1, 2)", "(2, 2)", "(3, 2)",
  "(1, 3)", "(2, 3)", "(3, 3)",
]

export default class AppClass extends React.Component {
  state = {
    ...initialState
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    console.log("[APP_CLASS] - resetted")
    const s = document.getElementById("email")
    s.value = ""
    this.setState(initialState)

    // console.log(this.state)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //console.log(direction)
    if (direction == "left") {
      if (this.state.index == 0 || this.state.index == 3 || this.state.index == 6) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go left")
        })

        return
      }
    } else if (direction == "up") {
      if (this.state.index == 0 || this.state.index == 1 || this.state.index == 2) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go up")
        })

        return
      }
    } else if (direction == "right") {
      if (this.state.index == 2 || this.state.index == 5 || this.state.index == 8) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go right")
        })

        return
      }
    } else if (direction == "down") {
      if (this.state.index == 6 || this.state.index == 7 || this.state.index == 8) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go down")
        })

        return
      }
    }

    this.move(direction)
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let index;
    if (evt == "left") {
      index = (this.state.index - 1)
    } else if (evt == "up") {
      index = (this.state.index - 3)
    } else if (evt == "right") {
      index = (this.state.index + 1)
    } else if (evt == "down") {
      index = (this.state.index + 3)
    }

    //console.log(Array.from(grid[1])[4])
    this.setState({
      ...this.state,
      ["index"]: index,
      ["message"]: "",
      ["steps"]: (this.state.steps + 1),
    })
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    // console.log(evt)
    if (evt.target.id == "email") {
      // console.log(evt, evt.target.value)
      this.setState({
        ...this.state,
        ["email"]: evt.target.value
      })
    } else {
      this.getNextIndex(evt.target.id)
    }
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    //  console.log(evt, this.state.email)

    if (this.state.email != "" && this.state.email != undefined) {

      axios.post("http://localhost:9000/api/result", {
        "x": Array.from(grid[this.state.index])[1],
        "y": Array.from(grid[this.state.index])[4],
        "steps": this.state.steps,
        "email": this.state.email,
      }).then(val => {
        const s = document.getElementById("email")
        s.value = ""

        this.setState({
          ...this.state,
          ["message"]: val.data.message,
        })

      }).catch(err => {
        // console.log(err)

        this.setState({
          ...this.state,
          ["message"]: err.response.data.message
        })
      })
    } else if (this.state.email == "") {
      this.setState({
        ...this.state,
        ["message"]: "Ouch: email is required",
      })
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {grid[this.state.index]}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps == 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === (this.state.index) ? ' active' : ''}`}>
                {idx === (this.state.index) ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.onChange} id="left">LEFT</button>
          <button onClick={this.onChange} id="up">UP</button>
          <button onClick={this.onChange} id="right">RIGHT</button>
          <button onClick={this.onChange} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

/* MY FAILED FIRST ATTEMPT -.- -.- -.- -.-""
import React from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0 //How many times you have moved...
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

const grid = [
  "(1, 1)", "(2, 1)", "(3, 1)",
  "(1, 2)", "(2, 2)", "(3, 2)",
  "(1, 3)", "(2, 3)", "(3, 3)",
]

export default class AppClass extends React.Component {
  state = {
    ...initialState
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    console.log("[APP_CLASS] - resetted")
    this.setState({ ...initialState })

  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //console.log(direction)
    if (direction == "left") {
      if (this.state.index == 0 || this.state.index == 3 || this.state.index == 6) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go left")
        })

        return
      }
    } else if (direction == "up") {
      if (this.state.index == 0 || this.state.index == 1 || this.state.index == 2) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go up")
        })

        return
      }
    } else if (direction == "right") {
      if (this.state.index == 2 || this.state.index == 5 || this.state.index == 8) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go right")
        })

        return
      }
    } else if (direction == "down") {
      if (this.state.index == 6 || this.state.index == 7 || this.state.index == 8) {
        this.setState({
          ...this.state,
          ["message"]: ("You can't go down")
        })

        return
      }
    }

    this.move(direction)
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let index;
    if (evt == "left") {
      index = (this.state.index - 1)
    } else if (evt == "up") {
      index = (this.state.index - 3)
    } else if (evt == "right") {
      index = (this.state.index + 1)
    } else if (evt == "down") {
      index = (this.state.index + 3)
    }

    // console.log(Array.from(grid[1])[4])
    this.setState({
      ...this.state,
      ["index"]: index,
      ["message"]: "",
      ["steps"]: (this.state.steps + 1),
    })
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    // console.log(evt)
    if (evt.target.id == "email") {
      //console.log(evt, evt.target.inputValue)
      this.setState({
        ...this.state,
        ["email"]: evt.target.value
      })
    } else {
      this.getNextIndex(evt.target.id)
    }
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    //  console.log(evt, this.state.email)

    if (this.state.email != "" && this.state.email != undefined) {

      axios.post("http://localhost:9000/api/result", {
        "x": Array.from(grid[this.state.index])[1],
        "y": Array.from(grid[this.state.index])[4],
        "steps": this.state.steps,
        "email": this.state.email,
      }).then(val => {
        this.setState({
          ...this.state,
          ["message"]: val.data.message
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          ...this.state,
          ["message"]: val.data.message
        })
      })
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {grid[this.state.index]}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps == 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === (this.state.index) ? ' active' : ''}`}>
                {idx === (this.state.index) ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.onChange} id="left">LEFT</button>
          <button onClick={this.onChange} id="up">UP</button>
          <button onClick={this.onChange} id="right">RIGHT</button>
          <button onClick={this.onChange} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email">type email</input>
          <input id="submit" type="submit" />
        </form>
      </div>
    )
  }
}

*/