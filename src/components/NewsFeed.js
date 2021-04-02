import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import Article from './Article';
import './NewsFeed.css';
import { Link } from 'react-router-dom';

Amplify.configure({

    API: {
        endpoints: [
            {
                name: "financeNewsAPI",
                endpoint: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne"
            }
        ]
    }
});

export default function NewsFeed( {loggedIn}) {

    const [newsFeed, setNewsFeed] = useState([])


    useEffect(()=>{
        getData()
    }, []);

    function getData() { 
        const apiName = 'financeNewsAPI';
        const path = '/news'; 
        const myInit = { // OPTIONAL
    headers: {
        "x-rapidapi-key": "5eb669d957msh89988095e1765f0p10e856jsnaaec5a0830af",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "useQueryString": "true"
    }, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    
};

API
  .get(apiName, path, myInit)
  .then(response => {
    setNewsFeed(response)
  })
  .catch(error => {
    console.log(error.response);
 });
      };
      
    
    return (
        <div className="dashboard">
            {loggedIn ? (<><div className="dashboard-container" id="news-container">
            <h2>News Feed</h2>
            {newsFeed.length < 1 ? (<div class="loader"></div>) :(
                newsFeed.map(news => {
                    return <Article title={news.title} link={news.link} date={news.pubDate}/>
                })
            )}
            </div>

            <div className="dashboard-container" id="api-2" >
            <h2>Other Api</h2>
            
            </div>

            <div className="dashboard-container" id="api-3">
            <h2>Other Api</h2>
            
            </div> </>) :
            (
                <p id="not-signed-in">Please Log In {<Link to="/login">Here</Link>}</p>

            )}
            
            

            
        </div>
    )
}
