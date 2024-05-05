import { useState, useEffect } from "react";

function useJobData() {
    const [jobData, setJobData] = useState([]); //creating a state to store data from api call
    const [isLoading, setIsLoading] = useState(true); 
    console.log(jobData)

    const fetchData = async () => {
        try {
            setIsLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          const body = JSON.stringify({
            limit: 9,
            offset: 0
          });
    
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
          };
          const response = await fetch(
            "https://api.weekday.technology/adhoc/getSampleJdJSON",
            requestOptions
          );
          const result = await response.json();
          setIsLoading(false);
          return result.jdList; //   array from the response
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          return []; // if api call fails then returning an empty array, these will handle empty data.
        }
      };

    useEffect(() => {
        
        const fetchDataAndUpdateState = async () => {
          const result = await fetchData();  //calling api to get the data
          setJobData(result);
        };
    
        fetchDataAndUpdateState();
      }, []);


    return {jobData, isLoading}
}
export default useJobData;