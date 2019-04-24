import React from 'react';

const AppContext = React.createContext({
  folders: [],
  notes: [],
  onDeleteNote: () => {}
});

export default AppContext;