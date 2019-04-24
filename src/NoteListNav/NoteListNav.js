import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css';
import FoldersContext from '../FoldersContext';

export default function NoteListNav(props) {
  return (
    <FoldersContext.Consumer>
      {({folders}) => (
        <div className='NoteListNav'>
          <ul className='NoteListNav__list'>
            {folders.map(folder =>
              <li key={folder.id}>
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(props.notes, folder.id)}
                  </span>
                  {folder.name}
                </NavLink>
              </li>
            )}
          </ul>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </CircleButton>
          </div>
        </div>
         
      )}
    </FoldersContext.Consumer>
  )
}

// NoteListNav.defaultProps = {
//   folders: []
// }
