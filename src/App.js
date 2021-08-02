import React, {Component} from 'react'
// import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import ChatPanel from './components/ChatPanel'
import Main from './components/Main'
import { auth, messageRef, roomRef } from './firebase'

import '../node_modules/bulma/css/bulma.css'

auth.createUserWithEmailAndPassword('i@i.com', '67ghj!!')
    .then(res => console.log('Response', res))
    .catch(err => console.error(err))

class App extends Component {

  state = {
    isLoggedIn: false,
    wantsToLogIn: false,
    email: '',
    uid: null, 
    // displayName: ''
    rooms: {},
    selectedRoom: null,
    messages: {}
  }

  loadData = () => {
    roomRef.once('value')
            .then(snapshot => {
              const rooms = snapshot.val()
              const selectedRoom = Object.keys(rooms)[0]
              this.setState({
                rooms, 
                selectedRoom
              });
              return messageRef
                    .orderByChild('roomId')
                    .equalTo(selectedRoom)
                    .once('value');
            }, 
            // console.log('messageRef: ', messageRef)
            )
            // Error: messageRef coming back undefined
            .then(snapshot => {
              console.log('messages', snapshot.val())
              // const messages = snapshot.val()
              // this.setState({
              //   messages
              // })
            })
            .catch(err => console.error(err));
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        const {email, uid} = user
        this.setState({
          email, 
          uid, 
          isLoggedIn: true
        });
        this.loadData();
        roomRef.on('value', snapshot => {
          const rooms = snapshot.val()
          this.setState({
            rooms
          });
        });
      }
    });
  }

  handleSignUp = ({ email, password }) => {
    auth.createUserWithEmailAndPassword(email, password)
    // can remove the .then to send email verification, etc
    // otherwise it persists the user and logs them in 
        // .then(user => console.log(user))
        .catch(err => console.error(err))
  }

  handleLogin = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({
            isLoggedIn: true,
            email: email, 
            uid: user.user.uid, 
            // displayName: user.user.displayName
          })
        })
        .catch(err => console.error(err))
  }

  logout = () => {
    auth.signOut()
        .then(() => {
          this.setState({
            isLoggedIn: false,
            email: '', 
            uid: null
          })
        })
  }

  setRoom = (id) => {
    messageRef  
      .orderByChild('roomId')
      .equalTo(id)
      .once('value')
      .then(snapshot => {
        const messages = snapshot.val()
        this.setState({
          selectedRoom: id,
          messages
        });
      });
  }

  addRoom = (roomTitle) =>{
    const room = {
      author: this.state.uid,
      title: roomTitle,
      created: Date.now()
    }
    roomRef.push(room)
  } 

  sendMessage = (message) => {
    messageRef.push(message)
  }

  render(){
    return (
      <div className='container'>
          <Navbar />
        <div className='columns is-gapless vh-100'>
          <SideBar rooms={this.state.rooms} logout={this.logout} selectedRoom={this.state.selectedRoom} setRoom={this.setRoom} addRoom={this.addRoom}
          />

          {this.state.isLoggedIn ? 
            <Main>
              <ChatPanel roomId={this.state.selectedRoom} email={this.state.email} uid={this.state.uid} messages={this.state.messages} sendMessage={this.sendMessage} /> 
            </Main> 
            : 
            <Main>
              {this.state.wantsToLogIn ? 
                <LoginForm onLogin={this.handleLogin} goToSignUp={() => this.setState({wantsToLogIn: false})}/> 
                :
                <SignUpForm onSignUp={this.handleSignUp} goToLogin={() => this.setState({wantsToLogIn: true})}/>  
              }
            </Main>

          }

        </div>
      </div>
    );
  }
}

export default App;
