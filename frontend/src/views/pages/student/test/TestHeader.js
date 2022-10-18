import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
import { LogOut } from 'react-feather';
import { useDispatch } from 'react-redux';
import Avatar from '@components/avatar';
import { isUserLoggedIn } from '@utils';
import { UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

const UserDropdown = () => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')));
		}
	}, []);

	const userAvatar = (userData && userData.avatar) || defaultAvatar;

	return (
		<UncontrolledDropdown tag="li" className="dropdown-user nav-item">
			<DropdownToggle
				href="/"
				tag="a"
				className="nav-link dropdown-user-link d-flex "
				style={{ gap: '1rem' }}
				onClick={(e) => e.preventDefault()}
			>
				<div className="user-nav d-sm-flex flex-column justify-content-end d-none text-right">
					<span className="user-name font-weight-bold">
						{(userData && userData['username']) || 'John Doe'}
					</span>
					<small className="user-status">{userData?.role}</small>
				</div>
				<Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
			</DropdownToggle>
		</UncontrolledDropdown>
	);
};

function Header() {
	return (
		<>
			<Navbar className="student-nav test-nav">
				<Link className="brand-logo" to="/">
					<img src={logoOncourse} alt="logo" />
				</Link>
				<Nav className="ml-auto nav navbar-nav align-items-center">
					<UserDropdown />
					<NavItem>
						<NavLink href="./subjects">
							<LogOut size={20} />
							Exit
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
			<div className="bg-dark text-light header-bar">
				<span>
					Preparing for the ACT - Math Practice - Untimed - TestPart_4805- Mathematics- Directions
				</span>
			</div>
		</>
	);
}

export default Header;
