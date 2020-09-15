import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Navbar() {

    return (
        <>
            <Nav className="mt-3 ">
                <Nav.Item>
                    <Link to="/" className="nav-link font-weight-bold ">Movie List</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/my-list" className="nav-link font-weight-bold">My List</Link>
                </Nav.Item>
            </Nav>
            <hr />
        </>
    );
}

export default Navbar;