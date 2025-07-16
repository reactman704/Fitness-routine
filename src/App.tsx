import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  

  const [exercises, setExercise] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoryList = [...new Set(exercises.map((exercise)=>(exercise.category_name)))];

  const filterExercise = exercises.filter((exericse)=>(
    exericse.category_name === selectedCategory
  ));

  

  useEffect(() => {
    fetchData();
  
    async function fetchData(){
      const url = 
      'https://gist.githubusercontent.com/reactman704/8d5aa05caf0bc1cc505ab76356e0fe0a/raw/835937c21f2beb658f10bf2a2c0d8e0dfacffb87/gistfile1.json';

      try {
        const response = await axios.get(url);
        
        
        setExercise(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    
  }, [])
  return (
    <>
      <div className='p-5 w-fill'>
        <div className='w-full flex flex-wrap gap-3'>
          {categoryList.map((category)=>(
            <button
              key={category}
              onClick={ () => (setSelectedCategory(category)) }
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap p-5'>
          { filterExercise.map((exercise)=>(
            <div key={exercise.id} className='p-10 border w-'>
              <div>{exercise.exercise_name}</div>
              <div>{exercise.description}</div>
            </div>
          )) }
        </div>
      </div>
    </>
  )
}

export default App
