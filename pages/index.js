import Head from "next/head";
import { useEffect, useState } from "react";
import Weather from "../components/weather/Weather";
import axios from "axios";
import Preloader from "../components/Preloader";
import LinkGrid from "../components/links/LinkGrid";
import Footer from "../components/Footer";

export default function Home() {
  const [dark, setDark] = useState(false); // Default to light theme with new palette
  const [weatherData, setWeatherData] = useState(null);
  const [compliment, setCompliment] = useState("");

  useEffect(() => {
    setDark(window.localStorage.getItem("theme") === "dark");
    axios.get("/api/compliment").then((res) => {
      setCompliment(res.data.compliment);
    });
    axios.get(`/api/weather`).then((res) => {
      setWeatherData(res.data);
    });
  }, []);

  if (compliment.length === 0 || !weatherData) {
    return <Preloader dark={dark} />;
  }

  return (
    <div className={`container ${dark ? "dark" : ""}`}>
      <Head>
        <title>hellaurr 🦕!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">hellaurr 🦕!</h1>
        <p className="description">hope you're having a great day!</p>
        
        {/* <div className="toggle-container">
          {dark ? (
            <Sun
              onClick={() => {
                window.localStorage.setItem("theme", "light");
                setDark(false);
              }}
              className="theme-toggle"
            />
          ) : (
            <Moon
              onClick={() => {
                window.localStorage.setItem("theme", "dark");
                setDark(true);
              }}
              className="theme-toggle"
            />
          )}
        </div> */}
        
        <code className={`${dark ? "dark-code" : ""} compliment`}>
          always rmr: {compliment}
        </code>

        <Weather weatherData={weatherData} dark={dark} />
        <LinkGrid dark={dark} />
      </main>
      
      <Footer dark={dark} />
      
      <style jsx>{`
        .dark {
          background: #006A71;
          color: #F2EFE7;
        }

        .dark .compliment {
          background: #48A6A7;
          color: #F2EFE7;
        }

        .dark .compliment:hover {
          background: #9ACBD0;
          color: #006A71;
        }

        .dark-code {
          color: #F2EFE7;
        }
        
        code:hover,
        code:active,
        code:focus {
          color: #006A71;
          border-color: #48A6A7;
        }

        .dark-code:hover,
        .dark-code:active,
        .dark-code:focus {
          background: #9ACBD0;
          border-color: #48A6A7;
          color: #006A71;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #F2EFE7;
          color: #006A71;
        }

        .compliment {
          cursor: pointer;
          background: #9ACBD0;
          color: #006A71;
          transition: all 0.3s ease;
        }

        .compliment:hover {
          background: #48A6A7;
          color: #F2EFE7;
        }

        .toggle-container {
          padding-bottom: 25px;
        }

        .theme-toggle {
          cursor: pointer;
          color: #48A6A7;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          color: #006A71;
        }

        .dark .theme-toggle {
          color: #9ACBD0;
        }

        .dark .theme-toggle:hover {
          color: #F2EFE7;
        }

        main {
          padding: 2.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        a {
          color: #48A6A7;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        a:hover {
          color: #006A71;
        }

        .dark a {
          color: #9ACBD0;
        }

        .dark a:hover {
          color: #F2EFE7;
        }

        .title a {
          color: #48A6A7;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          color: #006A71;
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          color: #006A71;
        }

        .dark .title {
          color: #F2EFE7;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          color: #48A6A7;
        }

        .dark .description {
          color: #9ACBD0;
        }

        code {
          background: #9ACBD0;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          border: 1px solid #48A6A7;
          transition: all 0.3s ease;
        }
      `}</style>
      
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        * {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          
          .description {
            font-size: 1.2rem;
          }
          
          code {
            font-size: 1rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}