import LinkGridCard from "./LinkGridCard";
import { useState, useEffect } from "react";

function LinkGrid({ dark }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    {
      title: "Our Pinterest Board",
      description: "very useful and cute",
      link: "https://pin.it/7Fgas4dIa",
    },
    {
      title: "Random Cat Pics",
      description: "guaranteed to make you smile",
      link: "https://photos.app.goo.gl/9LFvUSqJoaRdCpXQ6",
    },
    {
      title: "Shared Art Canvas",
      description: "come help me make an art wall",
      link: "https://magma.com/d/CMwtWvJ58a"
    },
    {
      title: "Pictures of Us",
      description: "meet call pictures :p",
      link: "https://photos.app.goo.gl/oBmsCoVCL4WAxby46"
    }
  ];

  const styles = {
    grid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: '800px',
      marginTop: '3rem',
      gap: '1.5rem',
    },
    gridMobile: {
      width: '100%',
      flexDirection: 'column',
    }
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
  

      <div style={styles.grid}>

        {links.map((link, index) => (
          <LinkGridCard
            key={index}
            title={link.title}
            description={link.description}
            link={link.link}
            dark={dark}
          />
        ))}

        <style jsx>{`
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
      </div>
    </>
  );
}

export default LinkGrid;