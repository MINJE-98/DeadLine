import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';

function getTeamInfo(userUid) {
    const [a ,b] = useState(null)
    (firebase.database().ref().child('Users').child(userUid).child('TeamList').once('value', snapshot2 =>{
        b(snapshot2)
      }))
    return(b)
}

export {getTeamInfo}