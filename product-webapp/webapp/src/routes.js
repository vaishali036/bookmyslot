 import Home from './Interviewer/components/home/Home';
import TagHome from './tagteam/components/home/TagHome';
import TechtrackCard from './tagteam/components/techtrack/TechtrackCard';
import { Dashboard } from './tagteam/Pages/Dashboard/Dashboard';
import {Report} from './tagteam/Pages/Reports/Report';
import LandingPageUI from './LandingPage/LandingPageUI';

export const routes = [
    {
        path: '/tag/dashboard',
        // exact: true,
        component: Dashboard,
        name: 'Dashboard',
    },
    {
        path: '/tag/reports',
        component: Report,
        name: 'Report'
    },
    {
        path: '/tag/home',
        component: TagHome,
        name: 'taghome'
    },
    {
        path: '/tag/tecktrack',
        component: TechtrackCard,
        name: 'TechtrackCard',
        exact: true
    },
    {
        path: '/interviewer/home',
        component: Home,
        name: 'interviewerhome'
    },
    {
        path: '/interviewer/dashboard',
        component: Dashboard,
        name: 'interviewerdashboard'
    },
    {
        path: '/',
        component: LandingPageUI,
        name: 'LandingPageUI'
    }

]


