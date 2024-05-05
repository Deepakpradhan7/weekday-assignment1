import { useState, useEffect } from "react";

function useJobData() {
    const [jobData, setJobData] = useState([]); //creating a state to store data from api call
    const [isLoading, setIsLoading] = useState(true); // indicating the loader state while api promises is being resolved
    const [page, setPage] = useState(0) //offset to pass during api call
    console.log(page, 'jd')
    console.log(jobData)

    //function call for api
    const fetchData = async () => {
        try {
            setIsLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          const body = JSON.stringify({
            limit: 3,
            offset: page
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
         
        
        const jobArray = result.jdList
        console.log('data set')
        setJobData((prev)=> [...prev, ...jobArray]); // destructuring the current array and adding with result array 
        setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          return []; // if api call fails then returning an empty array, these will handle empty data.
        }
      };

     

    useEffect(() => {
        fetchData() // calling the api call function
      }, [page]);

      //infinite scroll feature
      const handleInfiniteScroll =() =>{
        // If this condition is true, it means that the user has scrolled to the bottom 
        // of the page (or very close to it), and in response, it updates the page state by incrementing it by 1, 
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
              setIsLoading(true);
                setPage((prev)=>prev+9)
            }
        } catch (error) {
            console.log(error)
        }
      }

      useEffect(()=>{
        window.addEventListener('scroll', handleInfiniteScroll) 
        return () =>window.removeEventListener('scroll', handleInfiniteScroll)  // clean up function to clear last event listener 
      },[])


    return {jobData, isLoading}
}
export default useJobData;