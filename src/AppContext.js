import React from 'react'

const AppContext = React.createContext({
  folders: [],
  notes: [],
  onDeleteNote: () => {},
  updateNoteState: () => {}
})

export default AppContext
