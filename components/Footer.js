function Footer({ dark }) {
    return <>
        <footer className={dark ? "dark" : ""}>
            <a
                href="https://github.com/ProSavage/ur-a-cutie"
                target="_blank"
                rel="noopener noreferrer"
            >
                <code>
                    project wife-her 💍
                </code>
            </a>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                made with love for my favorite person
            </p>
        </footer>
        <style jsx>{`
            footer {
                width: 100%;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                background: #F2EFE7;
                transition: all 0.3s ease;
            }

            footer.dark {
                background: #006A71;
                border-top: 1px solid #48A6A7;
            }

            footer a {
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
            }

            code {
                color: #006A71;
                background: #9ACBD0;
                border-radius: 5px;
                padding: 0.75rem;
                font-size: 1.1rem;
                font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                transition: all 0.3s ease;
                border: 1px solid #48A6A7;
            }

            footer.dark code {
                color: #F2EFE7;
                background: #48A6A7;
                border: 1px solid #9ACBD0;
            }

            code:hover {
                background: #48A6A7;
                color: #F2EFE7;
                transform: translateY(-2px);
            }

            footer.dark code:hover {
                background: #9ACBD0;
                color: #006A71;
            }

            @media (max-width: 600px) {
                code {
                    font-size: 0.9rem;
                    padding: 0.5rem;
                }
                
                footer {
                    height: 80px;
                }
            }
        `}</style>
    </>
}

export default Footer;