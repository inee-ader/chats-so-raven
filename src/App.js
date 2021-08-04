import React, {Component} from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import ChatPanel from './components/ChatPanel'
import Main from './components/Main'
import SendMessageForm from './components/SendMessageForm'
import { auth, messageRef, roomRef } from './firebase'

import './styles/App.css'

// auth.createUserWithEmailAndPassword('i@i.com', '67ghj!!')
//     .then(res => console.log('Response', res))
//     .catch(err => console.error(err))

class App extends Component {

  state = {
    isLoggedIn: false,
    wantsToLogIn: false,
    email: '',
    uid: null, 
    rooms: {},
    selectedRoom: null,
    messages: {},
  }

  loadData = () => {
    roomRef.once('value')
          .then(snapshot => {
            const rooms = snapshot.val();
            const selectedRoom = Object.keys(rooms)[0];
            this.setState({
              rooms,
              selectedRoom
            });
            return messageRef
                    .orderByChild('roomId')
                    .equalTo(selectedRoom)
                    .once('value');
          })
          .then(snapshot => {
             const messages = snapshot.val() || {};
             this.setState({
               messages
             });
          })
          .catch(err => console.error(err));
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        const {email, uid} = user;
        this.setState({
          email,
          uid,
          isLoggedIn: true
        });
        this.loadData();
        roomRef.on('value', snapshot => {
          const rooms = snapshot.val();
          this.setState({
            rooms
          });
        });
        messageRef
          .on('child_added', snapshot => {
            const message = snapshot.val();
            const key = snapshot.key;
            if(message.roomId === this.state.selectedRoom){
              this.setState({
                messages: {
                  ...this.state.messages,
                  [key]: message
                }
              })
            }
          });
      }
    });
  }

  handleSignUp = ({ email, password }) => {
    auth.createUserWithEmailAndPassword(email, password)
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
        // Inee: add empty object in case there are no messages to set state to.
        const messages = snapshot.val() || {}
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
      <div className='app_container'>
          <Navbar />
        <div className='sidebar_main_container'>
          <SideBar isLoggedIn={this.state.isLoggedIn} rooms={this.state.rooms} logout={this.logout} selectedRoom={this.state.selectedRoom} setRoom={this.setRoom} addRoom={this.addRoom}
          />
          {this.state.isLoggedIn ? 
            <Main isLoggedIn={this.state.isLoggedIn}>
              <ChatPanel messages={this.state.messages} /> 
              <SendMessageForm email={this.state.email} roomId={this.state.selectedRoom} sendMessage={this.sendMessage} uid={this.state.uid}/>
            </Main> 
            : 
            <Main isLoggedIn={this.state.isLoggedIn}>
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
