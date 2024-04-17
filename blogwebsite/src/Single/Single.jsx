import Sidebar from "../Sidebar/Sidebar";
import Singlepost from "../SinglePost/Singlepost";
import "./Single.css"

function Single() {
  return <div className="single">
    <Singlepost/>
    <Sidebar/>
  </div>;
}

export default Single;
