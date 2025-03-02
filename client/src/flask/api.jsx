export const fetchPosts = async () => {
    try {
      const response = await fetch('/flask/posts'); 
      console.log(response);
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  
  export const fetchRecommendations = async (skills) => {
    try {
      const response = await fetch('/flask/recommendations', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });
      const data= response.json();
      console.log(data);
      return await response.json();
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return [];
    }
  };
  