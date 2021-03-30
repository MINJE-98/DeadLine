import * as React from 'react';

export const Context = React.createContext({ isload: true, teamselected: null, refresh: ()=> {}, hidetab: ()=> {}})