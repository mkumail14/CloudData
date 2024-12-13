import React from 'react';


export default function Footer() {
  return (
    <>
      <footer className="footer">
      <p className="footer-text">
  Developed by &lt; <b>Kumail</b> /&gt;
</p>

        
        <p className="copyright">© 2024 MKA. All rights reserved.  ||  <a target='blank' href='https://github.com/mkumail14'><i class="fa-brands fa-github"></i> </a>       
        </p>
      
      </footer>

      <style jsx>{`
        .footer {
          background-color: #222;
          color: #fff;
          padding: 0.5%;
          text-align: center;
          position: relative;
          display: block;
        }

        .footer-text {
          font-size: 16px;
        }

        .copyright {
          font-size: 14px;
          margin-top: 10px;
          color: #aaa;
        }
      `}</style>
    </>
  );
}
