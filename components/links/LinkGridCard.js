function LinkGridCard(props) {
  return <>
      <a key={props.link} href={props.link} className={`card ${props.dark ? 'dark' : ''}`}>
          <h3>{props.title} &rarr;</h3>
          <p>{props.description}</p>
      </a>
      <style jsx>{`
      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: #006A71;
        text-decoration: none;
        border: 2px solid #9ACBD0;
        border-radius: 10px;
        transition: all 0.3s ease;
        background-color: #F2EFE7;
      }

      .card.dark {
        color: #F2EFE7;
        border-color: #48A6A7;
        background-color: #006A71;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #006A71;
        border-color: #48A6A7;
        background-color: #9ACBD0;
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 106, 113, 0.2);
      }

      .card.dark:hover,
      .card.dark:focus,
      .card.dark:active {
        color: #F2EFE7;
        border-color: #9ACBD0;
        background-color: #48A6A7;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
        opacity: 0.9;
      }

      @media(max-width: 850px) {
        .card {
          width: 300px;
          flex-basis: auto;
        }
      }
      `}</style>
  </>
}

export default LinkGridCard;