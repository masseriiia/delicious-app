import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
    let params = useParams()
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json()
        setDetails(detailData)
    }

    useEffect(() => {
        fetchDetails()
    }, [params.name])

    return (
        <DetailWrapper>
           <Info>
               <h2> {details.title}</h2>
               <img src={details.image} alt=""/>
           </Info>
           <Descr>
               <Button
                   className={activeTab === 'instructions' ? 'active' : ''}
                   onClick={() => setActiveTab('instructions')}
               >Instructions
               </Button>
               <Button
                   className={activeTab === 'ingredients' ? 'active' : ''}
                   onClick={() => setActiveTab('ingredients')}
               >Ingredients
               </Button>
               {activeTab === 'instructions' && (
                   <DescrConstruction>
                       <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                       <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                   </DescrConstruction>
               )}
               {activeTab === 'ingredients' && (
                   <ul>
                       {details.extendedIngredients.map((ingredient) => (
                           <li key={ingredient.key}>{ingredient.original}</li>
                       ))}
                   </ul>
               )}

           </Descr>
        </DetailWrapper>
    );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 30px;
  
  @media(max-width: 1400px) {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 14px;
  }
  li {
    font-size: 14px;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`

const DescrConstruction = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  padding: 16px 32px;
  margin: 10px;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  @media (max-width: 600px) {
    img {
      width: 100%;
    }
  }
`

const Descr = styled.div`
  display: flex;
  flex-direction: column;
`

export default Recipe;