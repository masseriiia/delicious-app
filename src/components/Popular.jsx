import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {NavLink} from "react-router-dom";


const Popular = () => {
    const [popular, setPopular] = useState([])
    const [perPage, setPerPage] = useState(3);

    useEffect(() => {
        getPopular()
        handleResize();
        window.addEventListener('resize', handleResize); 
        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, [])

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1920) {
            setPerPage(3); 
        } else if (windowWidth >= 1400) {
            setPerPage(2); 
        } else {
            setPerPage(1); 
        }
    };

    const getPopular = async () => {
        const check = localStorage.getItem('popular')

        if (check) {
            setPopular(JSON.parse(check))
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)

            const data = await api.json()
            localStorage.setItem('popular', JSON.stringify(data.recipes))
            setPopular(data.recipes)
        }
    }

    return (
        <Wrapper>
            <h3>Popular Pickers</h3>
            <Splide
                options={{
                    perPage: perPage,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
            }}
            >
                {
                    popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card key={recipe.id}>
                                    <NavLink to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title}/>
                                        <Gradient/>
                                    </NavLink>
                                </Card>
                            </SplideSlide>
                        )
                    })
                }
            </Splide>

        </Wrapper>
    );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
   min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Popular;