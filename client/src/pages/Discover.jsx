import ProjectList from "./ProjectList"
// import Chat from "../components/Chat";
import Recommendations from "../flask/recommendations";


const Discover = () => {
  return (
    <div>
      <ProjectList/>
      {/* <Chat groupId="group1" user="User1" /> */}
      <Recommendations />
    </div>
  )
}

export default Discover