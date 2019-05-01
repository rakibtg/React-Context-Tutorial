import React from 'react'

const AppContext = React.createContext()

class AppProvider extends React.Component {
  state = {
    friends: [
      {
        name: 'rakibtg',
        stories: 2
      },
      {
        name: 'Foo Bar',
        stories: 32
      },
      {
        name: 'Zucker Man',
        stories: 3
      }
    ]
  }
  handleNewFriend() {
    this.setState({
      friends: [
        {
          name: 'May',
          stories: 10
        },
        ...this.state.friends
      ]
    })
  }
  render() {
    const { children } = this.props
    return <AppContext.Provider value={{
      state: this.state,
      addFriend: () => this.handleNewFriend()
    }}>
      {children}
    </AppContext.Provider>
  }
}

function User() {
  return <div className="User">
    <h4>All Friends</h4>
    <Friends />
  </div>
}

function Friends() {
  return <AppContext.Consumer>
    {context => {
      return <div className="Friends">
        {
          context.state.friends.map((friend, index) => {
            return <div class="Friend" key={index}>
              <div><strong>{friend.name}</strong></div>
              <div>{friend.stories} new stories</div>
            </div>
          })
        }
        <button onClick={() => context.addFriend()}>Add New Friend</button>
      </div>
    }}
  </AppContext.Consumer>
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <h1>React Context</h1>
        <User />
      </div>
    </AppProvider>
  )
}

export default App