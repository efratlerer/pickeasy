import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainForm from './Form/MainForm'
import NavBar from './navBar/NavBar'
import Footer from './footer/Footer'
import QuestionForm from './question/QuestionForm'
import QuestionsList from './question/QuestionsList'
import { Route, Routes } from "react-router-dom";
import Layout from './Layout'
import ScrollToTopOnRefresh from './ScrollToTopOnRefresh'
import HomePage from './home/HomePage'
import MainComment from './comment/MainComment'
import LeaderList from './leaders/LeaderList'
import Category from './question/category'
import About from './about/About'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuestionForm ></QuestionForm>
      <ScrollToTopOnRefresh></ScrollToTopOnRefresh>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/QuestionsList" element={<QuestionsList />} />
          <Route path="/MainComment" element={<MainComment />} />
          <Route path="/LeaderList" element={<LeaderList />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Layout>

    </>
  )
}

export default App
