import React, { useEffect } from 'react'
import CustomMedia from '../../Components/CustomMedia/CustomMedia'
import { useDispatch, useSelector } from 'react-redux'
import { setRecipes } from '../store/slices/recipesSlice'
import "./HomePage.css"


const HomePage = () => {
const dispatch = useDispatch();
 // Example of fetching recipes (replace with your actual fetch logic)
 useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/recipe/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      dispatch(setRecipes(data));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  fetchRecipes();
}, []);
const user=useSelector((state)=>state.auth.user)
    const data = [
        {
          src: 'make-a-recipe.png',
          title: 'Share a Recipe!',
          link:"/recipe"
        },
        {
          src: 'plan-a-meal.png',
          title: 'Plan a Meal!',
          link:"/meal"

        },
        {
          src: 'shopping-list.png',
          title: 'Shopping List!',
          link:"/shopping"
        },
        {
            src: 'nutrition-calc.png',
            title: 'Nutritional Calculator!',
            link:"/nutrition"
        }
      ];
  return (
    <>
    <div className='greeting'>
      Hello {user.username}!
    </div>
    <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        
   <CustomMedia data={data}/>
    </>
  )
}

export default HomePage