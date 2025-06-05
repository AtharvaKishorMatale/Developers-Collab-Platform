import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaMoon, FaSun } from "react-icons/fa"
import { toggleTheme } from "../redux/theme/themeSlice"
import { signoutSuccess } from "../redux/user/userSlice"
import Notification from "./notification"

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Search term submitted:", searchTerm)
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleSignout = () => {
    dispatch(signoutSuccess())
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          <span className="px-2 py-1 bg-gradient-to-r from-blue-700 via-black to-blue-500 rounded-lg text-white">
            DevConnect
          </span>
        </Link>
        <form onSubmit={handleSubmit} className="hidden lg:block flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <nav className="flex items-center space-x-4">
        <Link
            to="/Chat"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Chats
          </Link>
          <Link
            to="/Discover"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Discover Projects
          </Link>
          {currentUser ? (
            <div className="relative group">
              <img
                src={currentUser.profilePicture || "/placeholder.svg"}
                alt="user"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  <p>{currentUser.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                </div>
                <Link
                  to="/dashboard?tab=profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/sign-in">
              <button className="bg-gradient-to-r from-blue-700 via-black to-blue-500 text-white rounded-lg px-4 py-2 hover:shadow-md transition-all duration-200">
                Login
              </button>
            </Link>
          )}
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          {currentUser && (
            <div className="relative">
              <Notification currentUserId={currentUser._id} />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

