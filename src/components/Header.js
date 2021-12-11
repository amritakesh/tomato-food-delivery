import "./styles.css";
import { React, useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../firebase";
import {
	Container,
	Navbar,
	Nav,
	Dropdown,
	Badge,
	FormControl,
	Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../Context";
const Header = () => {
	const { cart, totalQty, setSearchQuery } = useContext(CartContext);
	const { user } = useAuthState();
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Nav>
					<Navbar.Brand>
						<Link className="text-decoration-none" to="/">
							Tomato
						</Link>
					</Navbar.Brand>
					<Nav.Link>
						<Link className="text-decoration-none" to="/cart">
							Cart
						</Link>
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					<FormControl
						style={{ width: "300" }}
						placeholder="Search an item"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</Nav>
				<Nav>
					<Dropdown alignRight style={{ marginRight: 150 }}>
						<Dropdown.Toggle variant="success">
							<FaShoppingCart color="white" />
							<Badge bg="info">{totalQty}</Badge>
						</Dropdown.Toggle>
						<Dropdown.Menu style={{ minWidth: 300 }}>
							{cart.map((item) => (
								<div style={{ padding: 10 }}>
									{item.name} - Rs {item.price} x {item.qty}
								</div>
							))}
							{cart.length === 0 ? (
								<span style={{ padding: 10 }}>Cart is empty!</span>
							) : null}
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
				<Nav>
					{user ? (
						<Button variant="outline-danger" onClick={() => signOut(getAuth())}>
							Sign out
						</Button>
					) : (
						<Link to="/login">
							<Button variant="outline-success">Sign in</Button>
						</Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
