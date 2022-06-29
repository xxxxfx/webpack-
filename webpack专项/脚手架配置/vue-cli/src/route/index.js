import { createRouter, createWebHistory} from 'vue-router';
 const Home = () => import('../View/Home');
 const About = () => import('../View/About');

 export default createRouter({
   history: createWebHistory(),
   routes: [
     {
       path: '/home',
       component: Home
     },
     {
      path: '/about',
      component: About
    }
   ]
 })