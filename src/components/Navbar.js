import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { social, links } from '../data';

const Navbar = () => {
  const [showlinks, setShowlinks] = useState(false);
  const linksRef = useRef(null);
  const containerRef = useRef(null);

  const handleSubmit = () => {
    setShowlinks(!showlinks);
  }

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    
    if (showlinks) {
      containerRef.current.style.height = ` ${linksHeight}px`;
    } else {
      containerRef.current.style.height = `0px`;
    }
  },[showlinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h4>sky<span>coding</span></h4>
          <button className="nav-toggle" onClick={handleSubmit}>
            <FaBars/>
          </button>
        </div>
        <div ref={containerRef} className="links-container">
          <ul ref={linksRef} className="links">
            {links.map((link) => {
              const { url, text, id } = link;
              return (
                <li key={id}>
                  <a href={url}>
                    {text}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className="social-icon">
          {social.map((icons) => {
            const { id, url, icon } = icons;
            return (
              <li key={id}>
                <a href={url}>
                  {icon}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
