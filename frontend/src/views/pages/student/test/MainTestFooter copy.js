// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { PaginationItem, Pagination, PaginationLink } from 'reactstrap';
// import { handleSelectQuestion, handleSelectSubject } from '../../../../redux/examSlice';

// function MainTestFooter({ handleChangeQueryData }) {
// 	const dispatch = useDispatch();
// 	const { examData, currentSelectedQuestion, currentSelectedSubject, currentActiveSection } =
// 		useSelector((state) => state.exam);
// 	const handleClickOnPagination = (e, data) => {
// 		e.preventDefault();
// 		dispatch(handleSelectQuestion(data.question_number));
// 		dispatch(handleSelectSubject(data.subject_name));
// 		handleChangeQueryData({
// 			question_number: data?.question_number,
// 			subject_name: data?.subject_name,
// 		});
// 	};

// 	const handleSectionInfoPagination = (e, data) => {
// 		e.preventDefault();
// 		dispatch(handleSelectQuestion(''));
// 		dispatch(handleSelectSubject(data.subject_name));
// 	};

// 	return (
// 		<>
// 			{/* <PaginationItem className="flag-active">
// 					<Flag size={10} />
// 					<PaginationLink href="#" className="active">
// 						1
// 					</PaginationLink>
// 				</PaginationItem> */}
// 			<Pagination aria-label="Page navigation example" className="test-pagination" size="sm">
// 				<PaginationItem>
// 					<PaginationLink first href="#" />
// 				</PaginationItem>
// 				{examData?.subjectsCount?.English && (
// 					<>
// 						<PaginationItem
// 							disabled={currentActiveSection !== 'English'}
// 							active={
// 								currentSelectedQuestion === '' &&
// 								currentSelectedSubject === 'English' &&
// 								currentActiveSection === 'English'
// 							}
// 						>
// 							<PaginationLink
// 								href="#"
// 								onClick={(e) =>
// 									handleSectionInfoPagination(e, {
// 										subject_name: 'English',
// 									})
// 								}
// 							>
// 								English Section Info
// 							</PaginationLink>
// 						</PaginationItem>
// 						{Array.from(Array(examData?.subjectsCount?.English), (e, index) => {
// 							return (
// 								<PaginationItem
// 									key={index}
// 									disabled={currentActiveSection !== 'English'}
// 									active={
// 										index + 1 === currentSelectedQuestion && currentSelectedSubject === 'English'
// 									}
// 								>
// 									<PaginationLink
// 										href="#"
// 										onClick={(e) =>
// 											handleClickOnPagination(e, {
// 												question_number: index + 1,
// 												subject_name: 'English',
// 											})
// 										}
// 									>
// 										{index + 1}
// 									</PaginationLink>
// 								</PaginationItem>
// 							);
// 						})}
// 					</>
// 				)}

// 				{examData?.subjectsCount?.Maths && (
// 					<>
// 						<PaginationItem
// 							disabled={currentActiveSection !== 'Maths'}
// 							active={
// 								currentSelectedQuestion === '' &&
// 								currentSelectedSubject === 'Maths' &&
// 								currentActiveSection === 'Maths'
// 							}
// 						>
// 							<PaginationLink
// 								href="#"
// 								onClick={(e) =>
// 									handleSectionInfoPagination(e, {
// 										subject_name: 'Maths',
// 									})
// 								}
// 							>
// 								Maths Section Info
// 							</PaginationLink>
// 						</PaginationItem>
// 						{Array.from(Array(examData?.subjectsCount?.Maths), (e, index) => {
// 							return (
// 								<PaginationItem
// 									key={index}
// 									disabled={currentActiveSection !== 'Maths'}
// 									active={
// 										index + 1 === currentSelectedQuestion && currentSelectedSubject === 'Maths'
// 									}
// 								>
// 									<PaginationLink
// 										href="#"
// 										onClick={(e) =>
// 											handleClickOnPagination(e, {
// 												question_number: index + 1,
// 												subject_name: 'Maths',
// 											})
// 										}
// 									>
// 										{index + 1}
// 									</PaginationLink>
// 								</PaginationItem>
// 							);
// 						})}
// 					</>
// 				)}

// 				<PaginationItem
// 					disabled={currentActiveSection !== 'Break-15min'}
// 					active={
// 						currentSelectedQuestion === '' &&
// 						currentSelectedSubject === 'Break-15min' &&
// 						currentActiveSection === 'Break-15min'
// 					}
// 				>
// 					<PaginationLink
// 						href="#"
// 						onClick={(e) =>
// 							handleSectionInfoPagination(e, {
// 								subject_name: 'Break-15min',
// 							})
// 						}
// 					>
// 						Break 15 Min
// 					</PaginationLink>
// 				</PaginationItem>

// 				{examData?.subjectsCount?.Reading && (
// 					<>
// 						<PaginationItem
// 							disabled={currentActiveSection !== 'Reading'}
// 							active={
// 								currentSelectedQuestion === '' &&
// 								currentSelectedSubject === 'Reading' &&
// 								currentActiveSection === 'Reading'
// 							}
// 						>
// 							<PaginationLink
// 								href="#"
// 								onClick={(e) =>
// 									handleSectionInfoPagination(e, {
// 										subject_name: 'Reading',
// 									})
// 								}
// 							>
// 								Reading Section Info
// 							</PaginationLink>
// 						</PaginationItem>
// 						{Array.from(Array(examData?.subjectsCount?.Reading), (e, index) => {
// 							return (
// 								<PaginationItem
// 									key={index}
// 									disabled={currentActiveSection !== 'Reading'}
// 									active={
// 										index + 1 === currentSelectedQuestion && currentSelectedSubject === 'Reading'
// 									}
// 								>
// 									<PaginationLink
// 										href="#"
// 										onClick={(e) =>
// 											handleClickOnPagination(e, {
// 												question_number: index + 1,
// 												subject_name: 'Reading',
// 											})
// 										}
// 									>
// 										{index + 1}
// 									</PaginationLink>
// 								</PaginationItem>
// 							);
// 						})}
// 					</>
// 				)}

// 				{examData?.subjectsCount?.Science && (
// 					<>
// 						<PaginationItem
// 							disabled={currentActiveSection !== 'Science'}
// 							active={
// 								currentSelectedQuestion === '' &&
// 								currentSelectedSubject === 'Science' &&
// 								currentActiveSection === 'Science'
// 							}
// 						>
// 							<PaginationLink
// 								href="#"
// 								onClick={(e) =>
// 									handleSectionInfoPagination(e, {
// 										subject_name: 'Science',
// 									})
// 								}
// 							>
// 								Science Section Info
// 							</PaginationLink>
// 						</PaginationItem>
// 						{Array.from(Array(examData?.subjectsCount?.Science), (e, index) => {
// 							return (
// 								<PaginationItem
// 									key={index}
// 									disabled={currentActiveSection !== 'Science'}
// 									active={
// 										index + 1 === currentSelectedQuestion && currentSelectedSubject === 'Science'
// 									}
// 								>
// 									<PaginationLink
// 										href="#"
// 										onClick={(e) =>
// 											handleClickOnPagination(e, {
// 												question_number: index + 1,
// 												subject_name: 'Science',
// 											})
// 										}
// 									>
// 										{index + 1}
// 									</PaginationLink>
// 								</PaginationItem>
// 							);
// 						})}
// 					</>
// 				)}

// 				{examData?.subjectsCount?.Essay && (
// 					<>
// 						<PaginationItem
// 							disabled={currentActiveSection !== 'Essay'}
// 							active={
// 								currentSelectedQuestion === '' &&
// 								currentSelectedSubject === 'Essay' &&
// 								currentActiveSection === 'Essay'
// 							}
// 						>
// 							<PaginationLink
// 								href="#"
// 								onClick={(e) =>
// 									handleSectionInfoPagination(e, {
// 										subject_name: 'Essay',
// 									})
// 								}
// 							>
// 								Essay Section Info
// 							</PaginationLink>
// 						</PaginationItem>
// 						{Array.from(Array(examData?.subjectsCount?.Essay), (e, index) => {
// 							return (
// 								<PaginationItem
// 									key={index}
// 									disabled={currentActiveSection !== 'Essay'}
// 									active={
// 										index + 1 === currentSelectedQuestion && currentSelectedSubject === 'Essay'
// 									}
// 								>
// 									<PaginationLink
// 										href="#"
// 										onClick={(e) =>
// 											handleClickOnPagination(e, {
// 												question_number: index + 1,
// 												subject_name: 'Essay',
// 											})
// 										}
// 									>
// 										{index + 1}
// 									</PaginationLink>
// 								</PaginationItem>
// 							);
// 						})}
// 					</>
// 				)}
// 				<PaginationItem>
// 					<PaginationLink href="#" last />
// 				</PaginationItem>
// 			</Pagination>
// 		</>
// 	);
// }
// export default MainTestFooter;
