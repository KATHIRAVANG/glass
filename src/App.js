import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import _merge from 'lodash/merge'
import _kebabCase from 'lodash/kebabCase'

import data from './data.json'

// Compontents

import ScrollToTop from './components/ScrollToTop'
import Meta from './components/Meta'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AOS from './components/AOS'
import Spinner from './components/Spinner'

// Views

import Home from './views/Home'
import About from './views/About'
import Models from './views/Models'
import Model from './views/Model'
import Blog from './views/Blog'
import BlogPost from './views/BlogPost'
import Contact from './views/Contact'
import JoinUs from './views/JoinUs'
import NoMatch from './views/NoMatch'


class App extends Component {
  state = {
    data,
    loading: false
  }

  componentDidMount = () => {
    this.fetchPreviewContent()
  }

  fetchPreviewContent = () => {
    if (
      !window.netlifyIdentity ||
      !window.netlifyIdentity.currentUser() ||
      process.env.NODE_ENV === 'development'
    ) {
      return false
    }
    import('./util/fetch-content').then(({ fetchContent }) => {
      this.setState({ loading: true })
      fetchContent()
        .then(newData => {
          this.setState(prevState => {
            const data = _merge(prevState.data, newData)
            return { data, loading: false }
          })
        })
        .catch(() => this.setState({ loading: false }))
    })
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection]

  render () {
    const globalSettings = this.getDocument('settings', 'global')
    const {
      siteTitle,
      siteUrl,
      siteDescription,
      twitter,
      facebook,
      linkedin,
      instagram,
      // phone,
      // address,
      // email,
      footer,
      headerScripts,
      header,
    } = globalSettings

    const modelTypes = this.getDocuments('model-types')
    const models = this.getDocuments('model')
    const posts = this.getDocuments('post')
    const postCategories = this.getDocuments('post-category')

    return (
      <Router>
        <div className='React-Wrap'>
          {this.state.loading && <Spinner />}
          <AOS options={{ duration: 250 }} />
          <ScrollToTop />
          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`${siteTitle} | %s`}
          />
          <Meta
            title={siteTitle}
            url={siteUrl}
            description={siteDescription}
            headerScripts={headerScripts}
          />
          <Nav header={header} modelTypes={modelTypes} />
          <Switch>
            <Route
              path='/'
              exact
              render={props => (
                <Home 
                  page={this.getDocument('pages', 'home')} 
                  globalSettings={globalSettings}
                  posts={posts}
                  postCategories={postCategories}
                  {...props} 
                />
              )}
            />
            <Route
              path='/about'
              exact
              render={props => (
                <About 
                  page={this.getDocument('pages', 'about')} 
                  globalSettings={globalSettings} 
                  {...props} 
                />
              )}
            />
            <Route
              path='/blog'
              exact
              render={props => (
                <Blog 
                  page={this.getDocument('pages', 'blog')}
                  posts={posts}
                  postCategories={postCategories} 
                  globalSettings={globalSettings}
                  {...props} 
                />
              )}
            />
            <Route
              path='/contact'
              exact
              render={props => (
                <Contact 
                  page={this.getDocument('pages', 'contact')}
                  globalSettings={globalSettings}
                  {...props} 
                />
              )}
            />
            <Route
              path='/join-us'
              exact
              render={props => (
                <JoinUs 
                  page={this.getDocument('pages', 'join-us')}
                  {...props} 
                />
              )}
            />
            <Route
              path='/blog/:postCategory'
              exact
              render={props => {
                const category = postCategories.find(selectedCategory => {
                    return selectedCategory.name === props.match.params.postCategory
                })

                return <Blog 
                  page={this.getDocument('pages', 'blog')}
                  posts={posts}
                  postCategories={postCategories}
                  selectedCategory={category} 
                  globalSettings={globalSettings} 
                  {...props}
                />

              }}
            />
            <Route
              path='/models/:modelType'
              exact
              render={props => {
                const modelType = modelTypes.find(selectedModelType => {                  
                  return selectedModelType.name === props.match.params.modelType
                })

                return <Models 
                  page={this.getDocument('pages', 'models')}
                  modelTypes={modelTypes}
                  globalSettings={globalSettings}
                  selectedModelType={modelType}
                  models={models}
                  {...props}
                />
              }}
            />
            <Route
              path='/model/:model'
              exact
              render={props => {
                const singleModel = models.find(model => {                  
                  return _kebabCase(model.title) === props.match.params.model
                })

                return <Model 
                  globalSettings={globalSettings}
                  models={models}
                  model={singleModel}
                  {...props}
                />
              }}
            />
            <Route
              path='/blog-post/:post'
              exact
              render={props => {
                const post = posts.map(post => {                  
                  return _kebabCase(post.title) === props.match.params.post
                })
                
                return <BlogPost 
                  globalSettings={globalSettings}
                  posts={posts}
                  post={post}
                  {...props}
                />
              }}
            />
            <Route render={() => <NoMatch siteUrl={siteUrl} />} />
          </Switch>
          <Footer 
            title={footer.title} 
            footerNav={footer.footerNav} 
            twitter={twitter} 
            facebook={facebook} 
            linkedin={linkedin} 
            instagram={instagram} 
          />
        </div>
      </Router>
    )
  }
}

export default App
