import React, { useEffect } from 'react'
import styles from './JusForFun.module.css';
const JusForFun = () => {
    useEffect(() => {
        const apiKey = "t0tiqdiXXE/22zIiW+dlrA==IYhOYNHs308H6oFL"; // Replace with your actual API key
        const apiUrl = "https://api.api-ninjas.com/v1/facts?limit=1";
    
        const fetchData = async () => {
          try {
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
                'X-Api-Key': apiKey,
                Accept: 'image/jpeg', // Specify the desired content type here
              },
            });
            const data = await response.json();
            console.log(data[0].fact)
          } catch (error) {
            console.error("An error occurred while fetching data:", error);
          }
        };
    
        fetchData(); // Call the async function
      }, []);
  return (
    <div className={styles['main-container']}>
      <div>Got Bored? Here is a Random Fact {}</div>
    </div>
  )
}

export default JusForFun
