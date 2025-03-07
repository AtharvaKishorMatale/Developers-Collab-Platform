import ProjectList from "./ProjectList"
import Recommendations from "../flask/recommendations";
import ProjectRecommendations from "../flask m/ProjectRecommendations";
// import TeammateRecommendations from "../flask m/TeammateRecommendations";



const Discover = () => {

  return (
    <div>
      <ProjectList/>
      <ProjectRecommendations/>
      {/* <TeammateRecommendations postId={postId}/> */}
      <Recommendations />
    </div>
  )
}

export default Discover