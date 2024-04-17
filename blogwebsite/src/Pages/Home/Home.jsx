import './Home.css'
import Header from "../../Header/Header";
// import Posts from "../../Posts/Posts";
// import Sidebar from "../../Sidebar/Sidebar";
import Post from '../../Post/Post';

function Home() {
  return (
    <>
    <Header />
    <div className="home">
     <Post/>
     {/* <Sidebar/> */}
      
    </div>
    </>
  );
}

export default Home;
