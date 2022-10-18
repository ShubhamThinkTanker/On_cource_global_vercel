// ** Logo
import logo from '@src/assets/images/logo/logo-oncourse_.png';
import loader from '@src/assets/images/logo/loader.gif';

const SpinnerComponent = () => {
	return (
		<div className="fallback-spinner vh-100">
			{/* <img className="fallback-logo" src={logo} alt="logo" /> */}
			<div className="loading">
				<img src={loader} alt="loader" />
			</div>
		</div>
	);
};

export default SpinnerComponent;
