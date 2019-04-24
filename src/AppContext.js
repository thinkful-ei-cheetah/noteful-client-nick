import React from 'react';

const AppContext = React.createContext({
  folders: [],
  notes: []
});

export default AppContext;