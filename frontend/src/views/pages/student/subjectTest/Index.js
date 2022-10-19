import React, { useState } from 'react';
import MainTest from '../test/MainTest';
import MainTestHeader from './MainTestHeader';
import MainTestFooter from './MainTestFooter';
const Index = () => {
	const [fontSize, setFontSize] = useState(14);

	const fontInc = () => {
		if (fontSize < 28) {
			setFontSize((fontSize) => fontSize + 4);
		}
	};
	const fontDec = () => {
		if (fontSize > 10) {
			setFontSize((fontSize) => fontSize - 4);
		}
	};
	const fontReset = () => {
		setFontSize(14);
	};
	return (
		<div className="main-test-sec">
			<MainTestHeader fontInc={fontInc} fontDec={fontDec} fontReset={fontReset} />
			<MainTest />
			<MainTestFooter />
		</div>
	);
};

export default Index;
