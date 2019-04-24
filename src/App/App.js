import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import { getNotesForFolder, findNote } from '../notes-helpers';
import AppContext from '../AppContext';
import './App.css'
import { promised } from 'q';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  componentDidMount() {
    const BASEURL = "http://localhost:9090";
    // fake date loading from API call
    const getFolders = fetch(BASEURL+'/folders')
    const getNotes = fetch(BASEURL+'/notes')

    Promise.all([getFolders, getNotes])
    .then(resArr =>{
      resArr.forEach((res, index) => {
        if (!res.ok) throw new Error("Something went horribly wrong :(");
        return [res.json(), index]
        .then(jsonData => {
          if(jsonData[1]===0) {
            this.setState({
              folders: jsonData[0],
              error: null
            })
          } else {
            this.setState({
              notes: jsonData[0],
              error: null
            })
          }
        })
      })})
    .catch(err => this.setState({error: err.message}))    
}

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} component={NoteListNav}/>
        )}
        <Route path='/note/:noteId' component={NotePageNav}/>
        <Route path='/add-folder' component={NotePageNav}/>
        <Route path='/add-note' component={NotePageNav}/>
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} component={NoteListMain}/>
        )}
        <Route path='/note/:noteId' component={NotePageMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    )
  }

  render() {
    return (
      <AppContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes
      }}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
