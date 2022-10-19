import React, { useMemo } from 'react';
import { Flag } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationItem, Pagination, PaginationLink } from 'reactstrap';
// import {
// 	handleGetQuestionByID,
// 	handleSelectQuestion,
// 	handleSelectSubject,
// } from '../../../../redux/examSlice';

function MainTestFooter() {
	const dispatch = useDispatch();
	let checkSubject =
		window.location.search.split('=')[window.location.search.split('=').length - 1];

	// const { examData, currentSelectedQuestion, currentSelectedSubject, currentActiveSection } =
	// 	useSelector((state) => state.exam);

	// const EnglishSubjectQuestions = useMemo(() => {
	// 	return examData?.questionnaire?.filter((item) => item.subject_name === 'English');
	// }, [examData]);
	// const MathsSubjectQuestions = useMemo(() => {
	// 	return examData?.questionnaire?.filter((item) => item.subject_name === 'Maths');
	// }, [examData]);
	// const ScienceSubjectQuestions = useMemo(() => {
	// 	return examData?.questionnaire?.filter((item) => item.subject_name === 'Science');
	// }, [examData]);
	// const ReadingSubjectQuestions = useMemo(() => {
	// 	return examData?.questionnaire?.filter((item) => item.subject_name === 'Reading');
	// }, [examData]);

	const handleClickOnPagination = (e, data) => {
		e.preventDefault();
		// dispatch(handleSelectQuestion(data.question_number));
		// dispatch(handleSelectSubject(data.subject_name));
		// dispatch(handleGetQuestionByID(data._id));
	};

	const handleSectionInfoPagination = (e, data) => {
		e.preventDefault();
		// dispatch(handleSelectQuestion(0));
		// dispatch(handleSelectSubject(data.subject_name));
	};

	return (
		<>
			{/* <PaginationItem className="flag-active">
					<Flag size={10} />
					<PaginationLink href="#" className="active">
						1
					</PaginationLink>
				</PaginationItem> */}
			<Pagination aria-label="Page navigation example" className="test-pagination" size="sm">
				<PaginationItem>
					<PaginationLink first href="#" />
				</PaginationItem>

				<>
					{/* {examData?.subjectsCount?.English && (
						<>
							<PaginationItem
								disabled={currentActiveSection !== 'English'}
								active={
									currentSelectedQuestion === 0 &&
									currentSelectedSubject === 'English' &&
									currentActiveSection === 'English'
								}
							>
								<PaginationLink
									href="#"
									onClick={(e) =>
										handleSectionInfoPagination(e, {
											subject_name: 'English',
										})
									}
								>
									English Section Info
								</PaginationLink>
							</PaginationItem>
							{EnglishSubjectQuestions?.map((question) => {
								return (
									<PaginationItem
										key={question._id}
										disabled={currentActiveSection !== 'English'}
										active={
											question.question_number === currentSelectedQuestion &&
											currentSelectedSubject === 'English'
										}
										className="flag-active"
									>
										{question?.flag === '1' && <Flag size={16} />}
										<PaginationLink href="#" onClick={(e) => handleClickOnPagination(e, question)}>
											{question.question_number}
										</PaginationLink>
									</PaginationItem>
								);
							})}
						</>
					)} */}
				</>

				{/* {examData?.subjectsCount?.Maths && (
					<>
						<PaginationItem
							disabled={currentActiveSection !== 'Maths'}
							active={
								currentSelectedQuestion === 0 &&
								currentSelectedSubject === 'Maths' &&
								currentActiveSection === 'Maths'
							}
						>
							<PaginationLink
								href="#"
								onClick={(e) =>
									handleSectionInfoPagination(e, {
										subject_name: 'Maths',
									})
								}
							>
								Maths Section Info
							</PaginationLink>
						</PaginationItem>
						{MathsSubjectQuestions?.map((question) => {
							return (
								<PaginationItem
									key={question._id}
									disabled={currentActiveSection !== 'Maths'}
									active={
										question.question_number === currentSelectedQuestion &&
										currentSelectedSubject === 'Maths'
									}
									className="flag-active"
								>
									{question?.flag === '1' && <Flag size={16} />}
									<PaginationLink href="#" onClick={(e) => handleClickOnPagination(e, question)}>
										{question.question_number}
									</PaginationLink>
								</PaginationItem>
							);
						})}
					</>
				)} */}

				{/* <PaginationItem
					disabled={currentActiveSection !== 'Break-15min'}
					active={
						currentSelectedQuestion === 0 &&
						currentSelectedSubject === 'Break-15min' &&
						currentActiveSection === 'Break-15min'
					}
				>
					<PaginationLink
						href="#"
						onClick={(e) =>
							handleSectionInfoPagination(e, {
								subject_name: 'Break-15min',
							})
						}
					>
						Break 15 Min
					</PaginationLink>
				</PaginationItem>

				{examData?.subjectsCount?.Reading && (
					<>
						<PaginationItem
							disabled={currentActiveSection !== 'Reading'}
							active={
								currentSelectedQuestion === 0 &&
								currentSelectedSubject === 'Reading' &&
								currentActiveSection === 'Reading'
							}
						>
							<PaginationLink
								href="#"
								onClick={(e) =>
									handleSectionInfoPagination(e, {
										subject_name: 'Reading',
									})
								}
							>
								Reading Section Info
							</PaginationLink>
						</PaginationItem>
						{ReadingSubjectQuestions?.map((question) => {
							return (
								<PaginationItem
									key={question._id}
									disabled={currentActiveSection !== 'Reading'}
									active={
										question.question_number === currentSelectedQuestion &&
										currentSelectedSubject === 'Reading'
									}
									className="flag-active"
								>
									{question?.flag === '1' && <Flag size={16} />}
									<PaginationLink href="#" onClick={(e) => handleClickOnPagination(e, question)}>
										{question.question_number}
									</PaginationLink>
								</PaginationItem>
							);
						})}
					</>
				)}

				{examData?.subjectsCount?.Science && (
					<>
						<PaginationItem
							disabled={currentActiveSection !== 'Science'}
							active={
								currentSelectedQuestion === 0 &&
								currentSelectedSubject === 'Science' &&
								currentActiveSection === 'Science'
							}
						>
							<PaginationLink
								href="#"
								onClick={(e) =>
									handleSectionInfoPagination(e, {
										subject_name: 'Science',
									})
								}
							>
								Science Section Info
							</PaginationLink>
						</PaginationItem>
						{ScienceSubjectQuestions?.map((question) => {
							return (
								<PaginationItem
									key={question._id}
									disabled={currentActiveSection !== 'Science'}
									active={
										question.question_number === currentSelectedQuestion &&
										currentSelectedSubject === 'Science'
									}
									className="flag-active"
								>
									{question?.flag === '1' && <Flag size={16} />}
									<PaginationLink href="#" onClick={(e) => handleClickOnPagination(e, question)}>
										{question.question_number}
									</PaginationLink>
								</PaginationItem>
							);
						})}
					</>
				)} */}

				<PaginationItem>
					<PaginationLink href="#" last />
				</PaginationItem>
			</Pagination>
		</>
	);
}
export default MainTestFooter;
