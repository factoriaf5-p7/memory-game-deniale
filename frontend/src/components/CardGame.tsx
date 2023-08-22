//animacion al darle click

import Card from 'react-bootstrap/Card';
import data from '../data/data.json'
import { shuffle } from '@vitest/utils';



export const CardGame = () => {
  
  const duplicatedCards = [...data, ...data]
  shuffle(duplicatedCards)
  console.log(duplicatedCards)
  return (


       <Card data-testid="card">

      </Card> 
   
  )
}
