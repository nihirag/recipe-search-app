import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';
import './App.css';



const App = () => {

  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  const APP_ID = 'a5bdaabf';
  const APP_KEY = "35cb5861f79ed71deafb0dd938e142b4"






  useEffect(() => {
    const Req = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const getRecipies = async () => {
      const response = await fetch(Req);
      const data = await response.json();
      setRecipies(data.hits);
    }
    getRecipies();
  }, [query]);




  const updateSearch = (e) => {
    setSearch(e.target.value);
  }
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className='App'>
      <form className='search-form' onSubmit={getSearch}>
        <input type='text' className='search-bar' value={search} onChange={updateSearch} />
        <button type='submit' className='search-button'>Search</button>
      </form>
      <div className='recipies'>
        {
          recipies.map((recipe) => (
            <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
          ))
        }
      </div>
    </div>
  )
}
export default App