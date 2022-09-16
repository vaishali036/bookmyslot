import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Interviewer/components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import TagHome from './tagteam/components/home/TagHome';
import TechtrackHome from './tagteam/components/techtrack/TechtrackHome';
import 'react-toastify/dist/ReactToastify.css';
 import './assets/css/custom.css'
import { Layout } from './Layout/Layout';
import { routes } from './routes';
import {Error404} from './tagteam/Pages/Errors/error404';
import LandingPageUI from './LandingPage/LandingPageUI';
import instance from './services/axios';


function App(props) {
  return (
    
    <BrowserRouter>
     
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<LandingPageUI />} />
        {/* <Route path="/interviewer/home" element={<Home />} /> */}
        {/* <Route path="/tagteam/home" element={<TagHome />} /> */}
        {/* <Route path="/techtrack/techtrackHome" element={<TechtrackHome />} /> */}
        <Route path="/" element={<Layout />} >
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                // render={(props) => (
                //     <route.component

                //         {...props}
                //     />
                // )}
                element={<route.component />}
              />
            ) : null; //<Navigate to="/error404" />;
          }
          )}
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
