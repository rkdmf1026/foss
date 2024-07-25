import Root from '@pages/Root/Root';
import Nav from '@components/Header/NavComponent';
import CompanyIntro from '@components/Main/CompanyIntro.tsx';
import MainIntro from '@components/Main/MainIntro.tsx';
import ReviewIntro from '@components/Main/ReviewIntro.tsx';
import BestMentos from '@components/Main/BestMentoIntro';
import Footer from '@components/Footer/Footer';
import Login from '@components/Login/Login';
import VideoChatApp from '@components/OpenVidu/Screen/VideoChat';
import MyPageView from './components/MyPage/MyPageView';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const nav = useNavigate();

  window.onload = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('tempToken');

    console.log(queryParams);
    console.log(code);

    if (code) {
      fetch(`http://localhost:8080/tokens`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${code}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('Authorization', data['Authorization']);
          // localStorage.setItem('Authorization-Refresh', data['Authorization-Refresh']);
          document.cookie = `Authorization-Refresh=${data['Authorization-Refresh']} path=/`;
          nav('/');
        })
        .catch((error) => console.error('Failed to fetch token:', error));
    }
  };

  return (
    <>
      {/* <VideoChatApp /> */}
      <Nav />
      {/* <MyPageView /> */}
      <MainIntro />
      <CompanyIntro />
      <ReviewIntro />
      <BestMentos />
      <Footer />
      {/* <Login /> */}
    </>
  );
};

export default App;
