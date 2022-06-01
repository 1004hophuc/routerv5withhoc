
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './PAGES/Home';
import About from './PAGES/About';
import Contact from './PAGES/Contact';
import PageNotFound from './PAGES/PageNotFound';
import Header from './GLOBAL/Header/Header';
import LoadingComponent from './GLOBAL/LoadingComponent.js/LoadingComponent';
import { UserTemplate } from './HOC/TemplateBugsProject/UserTemplate';
import UserLogin from './PAGES/user/UserLogin';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { BugsTemplate } from './HOC/TemplateBugsProject/BugsTemplate';
import indexBugs from './redux/saga/indexBugs';
import CreateProject from './PAGES/CreateProject/CreateProject';
import ProjectManagement from './PAGES/ProjectManagement/ProjectManagement';
import ModalBugsEditCreateProject from './HOC/ModalBugsEditCreateProject/ModalBugsEditCreateProject';

// propsRouter là những cái prop của Route như path, exact, history, match.... sẽ được truyền cho component Home
// Gõ path name tương ứng để đưa ra template tương ứng với path name đó thông quan hàm render

function App() {

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({
      type: 'ADD_HISTORY',
      history: history
    })

    return () => {
    }
  }, [])


  return (
    <>
      <ModalBugsEditCreateProject />
      <LoadingComponent />
      <Switch>

        <UserTemplate exact path='/login' Component={UserLogin} />
        <BugsTemplate exact path='/bugs' Component={indexBugs} />
        <BugsTemplate exact path='/createproject' Component={CreateProject} />
        <BugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />

        {/* <HomeTemplate exact path='/home' Component={Home} /> */}

        <Route exact path='/home' render={(propsRoute) => {
          return <div>
            <Header />
            <Home {...propsRoute} />
          </div>
        }} />

        {/* <HomeTemplate exact path='/about' Component={About} /> */}

        <Route exact path='/about' render={(propsRoute) => {
          return <div style={{ background: 'orange' }}>
            <About {...propsRoute} />
          </div>
        }} />


        <Route exact path='/contact' render={(propsRoute) => {
          return <div style={{ background: 'gray' }}>
            <Contact {...propsRoute} />
          </div>
        }} />

        <Route exact path='/' render={(propsRoute) => {
          return <div>
            <Header />
            <Home {...propsRoute} />
          </div>
        }} />
        <Route exact path='*' render={(propsRoute) => {
          return <div style={{ background: 'orange' }}>
            <PageNotFound {...propsRoute} />
          </div>
        }} />
      </Switch>
    </>
  );
}

export default App;

/*
================= CÁCH CƠ BẢN ===================

<Route exact path='/home' render={(propsRoute) => {
          return <div>
            <Header />
            <Home {...propsRoute} />
          </div>
        }} />



        <Route exact path='/about' render={(propsRoute) => {
          return <div style={{ background: 'orange' }}>
            <About {...propsRoute} />
          </div>
        }} />




        <Route exact path='/contact' render={(propsRoute) => {
          return <div style={{ background: 'gray' }}>
            <Contact {...propsRoute} />
          </div>
        }} />

================= CÁCH BÓC TÁCH NÂNG CAO ===================

export const HomeTemplate = (props) => {

    // Bóc tách componet
    const { Component, ...restParam } = props;

    return <Route path={restParam.path} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
        </Fragment>
    }} />
}

// HomeTemplate là 1 function trả về cho mình 1 thẻ Route, mà để trả về thẻ Route thì nó phải nhận vào props là 1 component

=>>>> <HomeTemplate exact path='/home' Component={Home} />
*/
