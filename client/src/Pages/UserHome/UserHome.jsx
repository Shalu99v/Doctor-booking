import UserSidebar from "../../components/Sidebar/UserSidebar"
import "./UserHome.css"
const UserHome = () => {
  return (
    <div className="home">
      <UserSidebar/>
    <div className="home-container">
      <h1>User Home</h1>
      <button>Download PDF</button>
    </div>
  </div>
  )
}

export default UserHome
