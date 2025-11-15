import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './component/Header'
import Fotter from './component/Footer'
import Home from './pages/Home'
import OfflineCourses from './pages/OfflineCourses'
import OnlineCourses from './pages/OnlineCourses'
import OurExperts from './pages/OurExperts'
import Blog from './pages/Blog'
import Carer from './pages/Carer'
import Contactus from './pages/Contactus'
import Gallery from './pages/Gallery'
import OurProfile from './pages/OurProfile'
import Management from './pages/Management'
import Facility from './pages/Facility'
import AcademyCouncil from './pages/AcademyCouncil'
import Placement from './pages/Placement'
import IntheMedia from './pages/IntheMedia';
import CourseCatSingle from './pages/CourseCatSingle';
import CourseSingle from './pages/CourseSingle';
import { BrowserRouter, Route, Switch} from "react-router-dom";



function App() {

	return (
    <div className="App">

    <BrowserRouter>
			<Header/>

      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/offline-courses" component={OfflineCourses}/>
        <Route path="/online-courses" component={OnlineCourses}/>
        <Route path="/our-experts" component={OurExperts}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/career" component={Carer}/>
        <Route path="/contactus" component={Contactus}/>
        <Route path="/gallery" component={Gallery}/>
        <Route path="/our-profile" component={OurProfile}/>
        <Route path="/management" component={Management}/>
        <Route path="/facility" component={Facility}/>
        <Route path="/academy-council" component={AcademyCouncil}/>
        <Route path="/placement" component={Placement}/>
        <Route path="/inthe-media" component={IntheMedia}/>
        <Route path="/course-detail/:id" children={<CourseSingle/>} />
        <Route path="/:cat/:tag" children={<CourseCatSingle/>} />
        {/* <Route path="/courses/:cat/:tag" children={<CourseCatSingle/>} /> */}

      </Switch>

      <Fotter/>
    
    </BrowserRouter>

    </div>
  );
}

export default App;


