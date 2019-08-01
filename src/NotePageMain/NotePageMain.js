import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import AppContext from '../AppContext'
import { findNote } from '../notes-helpers'

export default class NotePageMain extends React.Component {
  static contextType = AppContext

  render() {
    const { noteId } = this.props.match.params
    const note = findNote(this.context.notes, noteId)

    return (
      <section className="NotePageMain">
        <Note
          match={this.props.match}
          history={this.props.history} //temp
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    )
  }
}
