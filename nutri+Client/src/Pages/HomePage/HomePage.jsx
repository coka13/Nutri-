import React from 'react'
import CustomMedia from '../../Components/CustomMedia/CustomMedia'
import "./HomePage.css"
import { useSelector } from 'react-redux'


const HomePage = () => {
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