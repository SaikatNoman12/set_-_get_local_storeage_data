import React, { useEffect, useState } from 'react';
import {addToDb,  getToDb } from '../../utilities/fakedb';
import Meal from '../Meal/Meal';
import OrderList from '../OrderList/OrderList';
import './Restaurant.css';

const Restaurant = () => {
    const [meals, setMeals] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
            .then(res => res.json())
            .then(data => setMeals(data.meals));
    }, []);

    useEffect( () => {
        const storeCart = getToDb();
        const savedData = [];
        for(const id in storeCart){
            const findMeal = meals.find(meal => meal.idMeal === id);
            if(findMeal){
                const quantity = storeCart[id];
                findMeal.quantity = quantity;
                savedData.push(findMeal);
            } 
        }
        setOrders(savedData);

    }, [meals])
    
    const addTodb = meal =>{
        let saveCart = [];

        const findMeal = orders.find(m => m.idMeal === meal.idMeal);
        if(findMeal){
            const rest = orders.filter(m => m.idMeal !== meal.idMeal);
            findMeal.quantity = findMeal.quantity + 1;
            saveCart = [...rest, findMeal];
        }
        else{
            meal.quantity = 1;
            saveCart = [...orders, meal];
        }


        setOrders(saveCart);
        addToDb(meal.idMeal)

    }

    return (
        <div className="restaurant-menu">
            <div className="meals-container">
                {
                    meals.map(meal => <Meal
                        key={meal.idMeal}
                        meal={meal}
                        addTodb={addTodb}
                    ></Meal>)
                }
            </div>
            <div className="order-list">
                <OrderList orders={orders}></OrderList>
            </div>
        </div>

    );
};

export default Restaurant;