import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import Article from './components/article/Article';
import Articles from './components/article/Articles'
import ArticleList from './components/article/ArticleList';
import PostArticle from './components/article/PostArticle';
import EditArticle from './components/article/EditArticle';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Main from './components/auth/Main';
import TagArticles from './components/article/TagArticles';
import ScrollToTop from './components/ScrollToTop';

class App extends Component {
  render(){
    return (
    <BrowserRouter>
      <div className="App has-background-light">
        <Navbar/>
        <Switch>
          <ScrollToTop>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/auth/main' component={Main}/>
          <Route exact path='/articles/' component={Articles}/>
          <Route exact path='/articles/tag' component={TagArticles}/>
          <Route exact path='/article/' component={Dashboard}/>
          <Route exact path='/article/:id' component={Article}/>
          <Route exact path='/article/:id/edit' component={EditArticle}/>
          <Route path='/articles' component={ArticleList}/>
          <Route path='/post' component={PostArticle}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          </ScrollToTop>
        </Switch>
      </div>
    </BrowserRouter>
  );
  }
}

export default App;
