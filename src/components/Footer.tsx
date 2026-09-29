const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-slim">
          <span>© {year} Deepak Kandpal. All rights reserved.</span>
          <span>Designed &amp; built with Next.js</span>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--bdr);
          background: transparent;
          padding: 28px 0;
          margin-top: 40px;
        }
        .footer-slim {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          font-family: var(--font-body);
          font-size: 12.5px;
          color: var(--fg3);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
