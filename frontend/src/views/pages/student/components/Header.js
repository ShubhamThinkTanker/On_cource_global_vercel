import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logoOncourse from '@src/assets/images/logo/logo-oncourse_.png';
import { BarChart2, Book, BookOpen } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@components/avatar';
import { isUserLoggedIn } from '@utils';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { User, Power } from 'react-feather';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { StudentLogoutRequest } from '../../../../redux/authSlice';

const UserDropdown = () => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')));
		}
	}, []);

	const userAvatar = (userData && userData['profile_image']) || defaultAvatar;

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
				<Avatar
					img={`${process.env.REACT_APP_PROFILE_URL}${userAvatar}`}
					imgHeight="40"
					imgWidth="40"
					status="online"
				/>
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem tag={Link} to="/student/profile">
					<User size={14} className="mr-75" />
					<span className="align-middle">Profile</span>
				</DropdownItem>
				<DropdownItem
					tag={Link}
					to="/login"
					onClick={(e) => {
						e.preventDefault();
						dispatch(StudentLogoutRequest());
					}}
				>
					<Power size={14} className="mr-75" />
					<span className="align-middle">Logout</span>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

function Header() {
	return (
		<Navbar className="student-nav ">
			<Link className="brand-logo" to="/">
				<img src={logoOncourse} alt="logo" />
			</Link>
			<Nav className="ml-auto nav navbar-nav align-items-center">
				<NavItem>
					<NavLink href="">
						<BookOpen className="mr-1" />
						Tests & Prep
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink as={Link} to="/student/results">
						<BarChart2 className="mr-1" />
						Scores
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="">
						<Book className="mr-1" />
						Plans
					</NavLink>
				</NavItem>
				<UserDropdown />
			</Nav>
		</Navbar>
	);
}

export default Header;
