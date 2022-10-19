import React, { useEffect, useMemo, useState } from 'react';
import {
	ArrowLeftCircle,
	ArrowRightCircle,
	ZoomIn,
	ZoomOut,
	RotateCcw,
	Clock,
} from 'react-feather';
import {
	Badge,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Table,
	UncontrolledTooltip,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import {
// 	FlagQuestionBySubjectRequest,
// 	GetAllQuestionsBySubjectRequest,
// 	GetQuestionByParamsStudentRequest,
// 	handleEndSectionClick,
// 	handleSelectQuestionNext,
// 	handleSelectQuestionPrev,
// 	handleSetDeadLineExam,
// 	handleStartedTimer,
// 	TemporyResultRequest,
// } from '../../../../redux/examSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CountdownTimer from './CountDownTimer';

// const MySwal = withReactContent(Swal);

function MainTestHeader({ fontInc, fontReset, fontDec }) {
	const history = useHistory();
	// const {
	// 	examData,
	// 	currentSelectedQuestion,
	// 	currentSelectedSubject,
	// 	questionByID,
	// 	currentActiveSection,
	// 	deadLineExam,
	// 	startedTimer,
	// 	localiazedQuestions,
	// } = useSelector((state) => state.exam);
	// const { instructionsData } = useSelector((state) => state.instructions);
	const dispatch = useDispatch();
	const [dateTimeAfterDeadline, setDateTimeAfterDeadline] = useState(0);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

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

	// useEffect(() => {
	// 	// SET THE TIME HERE
	// 	if (startedTimer) {
	// 		const SetTimeDeadline = deadLineExam * 60 * 1000;
	// 		const NOW_IN_MS = new Date().getTime();
	// 		setDateTimeAfterDeadline(NOW_IN_MS + SetTimeDeadline);
	// 	} else if (currentActiveSection === 'Break-15min') {
	// 		const SetTimeDeadline = 15 * 60 * 1000;
	// 		const NOW_IN_MS = new Date().getTime();
	// 		setDateTimeAfterDeadline(NOW_IN_MS + SetTimeDeadline);
	// 	} else {
	// 		// SET DEFAULT TIME 0 MINUTE
	// 		const NOW_IN_MS = new Date().getTime();
	// 		setDateTimeAfterDeadline(NOW_IN_MS + 0);
	// 	}
	// }, [startedTimer, deadLineExam, currentActiveSection]);

	// const getMintueForSubject = useMemo(
	// 	() =>
	// 		instructionsData?.findAllInstruction?.filter(
	// 			(subject) => subject.subject_name === currentActiveSection
	// 		)[0]?.time_duration,
	// 	[instructionsData, currentActiveSection]
	// );
	// useEffect(() => {
	// 	if (!startedTimer && currentSelectedQuestion !== 0) {
	// 		dispatch(handleSetDeadLineExam(getMintueForSubject));
	// 		dispatch(handleStartedTimer(true));
	// 	}
	// }, [currentSelectedQuestion, startedTimer]);

	// useEffect(() => {
	// 	dispatch(GetAllQuestionsBySubjectRequest());
	// }, [dispatch]);

	const handlePrevButton = (e) => {
		e.preventDefault();
		// if (currentSelectedQuestion > 1) {
		// 	dispatch(handleSelectQuestionPrev());
		// 	const queryString = `question_number=${questionByID.question_number - 1}&subject_name=${
		// 		questionByID.subject_name
		// 	}`;
		// 	dispatch(GetQuestionByParamsStudentRequest(queryString));
		// }
	};

	const handleNextButton = (e) => {
		e.preventDefault();
		// if (currentSelectedQuestion === 0) {
		// 	dispatch(handleSelectQuestionNext());
		// 	const queryString = `question_number=${1}&subject_name=${currentActiveSection}`;
		// 	dispatch(GetQuestionByParamsStudentRequest(queryString));
		// }
		// if (currentSelectedQuestion >= 1) {
		// 	dispatch(handleSelectQuestionNext());
		// 	const queryString = `question_number=${questionByID.question_number + 1}&subject_name=${
		// 		questionByID.subject_name
		// 	}`;
		// 	dispatch(GetQuestionByParamsStudentRequest(queryString));
		// }
	};
	const handleFlagButtonClick = (e) => {
		e.preventDefault();
		// dispatch(
		// 	FlagQuestionBySubjectRequest({
		// 		questionnaire_id: questionByID._id,
		// 	})
		// );
		// const queryString = `question_number=${questionByID.question_number}&subject_name=${questionByID.subject_name}`;
		// dispatch(GetQuestionByParamsStudentRequest(queryString));
	};

	const handleEndSection = async () => {
		// return MySwal.fire({
		// 	title: 'Are you sure?',
		// 	// text: 'You would not be able to revert this!',
		// 	icon: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonText: 'Yes, End the Section !',
		// 	customClass: {
		// 		confirmButton: 'btn text-white main-color-btn',
		// 		cancelButton: 'btn btn-outline-danger ml-1',
		// 	},
		// 	buttonsStyling: false,
		// }).then(async function (result) {
		// 	if (result.value) {
		// 		MySwal.fire({
		// 			icon: 'success',
		// 			title: 'End Section!',
		// 			text: 'Your Section has been Ended.',
		// 			customClass: {
		// 				confirmButton: 'btn btn-success',
		// 			},
		// 		});
		// 		dispatch(handleEndSectionClick(currentSelectedSubject));
		// 	}
		// });
	};

	const handleEndExamSession = async () => {
		// return MySwal.fire({
		// 	title: 'Are you sure?',
		// 	// text: 'You would not be able to revert this!',
		// 	icon: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonText: 'Yes, End the Session !',
		// 	customClass: {
		// 		confirmButton: 'btn text-white main-color-btn',
		// 		cancelButton: 'btn btn-outline-danger ml-1',
		// 	},
		// 	buttonsStyling: false,
		// }).then(async function (result) {
		// 	if (result.value) {
		// 		MySwal.fire({
		// 			icon: 'success',
		// 			title: 'End Session!',
		// 			text: 'Your Session has been Ended.',
		// 			customClass: {
		// 				confirmButton: 'btn btn-success',
		// 			},
		// 		});
		// 		dispatch(
		// 			TemporyResultRequest({
		// 				type: 'end',
		// 				Temp_Quiz_Data: localiazedQuestions,
		// 			})
		// 		);
		// 		history.push('/student/results');
		// 	}
		// });
	};

	return (
		<div>
			<div className="bg-dark text-light test-footer-bar main-test-header">
				<ListGroup horizontal>
					{/* <ListGroupItem disabled={currentSelectedQuestion <= 1}> */}
					<ListGroupItem>
						<Button.Ripple
							outline
							className="round"
							color="secondary text-white"
							size="sm"
							onClick={handlePrevButton}
						>
							<ArrowLeftCircle size={16} />
							<span className="align-middle ms-25">Previous</span>
						</Button.Ripple>
					</ListGroupItem>
					<ListGroupItem>
						<Button.Ripple
							outline
							className="round"
							color="secondary text-white"
							size="sm"
							onClick={toggle}
						>
							<span className="align-middle ms-25">Nav</span>
						</Button.Ripple>
					</ListGroupItem>
					<ListGroupItem>
						<Button.Ripple
							outline
							className="round"
							color="secondary text-white"
							size="sm"
							onClick={handleNextButton}
						>
							<span className="align-middle ms-25">Next</span>
							<ArrowRightCircle size={16} />
						</Button.Ripple>
					</ListGroupItem>
				</ListGroup>
				<ListGroup horizontal>
					<ListGroupItem>Manage Assesments</ListGroupItem>
					<ListGroupItem
						onClick={() => {
							handleEndSection();
						}}
					>
						End Section
					</ListGroupItem>
					<ListGroupItem onClick={handleFlagButtonClick}>Flag</ListGroupItem>
					{/* <ListGroupItem>
						<UncontrolledDropdown>
							<DropdownToggle caret>
								<Tool size={16} />
								Tools
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>Header</DropdownItem>
								<DropdownItem>Another Action</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</ListGroupItem> */}

					<ListGroupItem>
						<ButtonGroup className="zoom-btngroup">
							<Button onClick={() => fontInc()} id="zoom-in-btn">
								<ZoomIn size={16} />
								<UncontrolledTooltip placement="bottom" target="zoom-in-btn">
									Zoom In
								</UncontrolledTooltip>
							</Button>
							<Button onClick={() => fontReset()} id="reset-btn">
								<RotateCcw size={16} />
								<UncontrolledTooltip placement="bottom" target="reset-btn">
									Reset
								</UncontrolledTooltip>
							</Button>
							<Button onClick={() => fontDec()} id="zoom-out-btn">
								<ZoomOut size={16} />
								<UncontrolledTooltip placement="bottom" target="zoom-out-btn">
									Zoom Out
								</UncontrolledTooltip>
							</Button>
						</ButtonGroup>
					</ListGroupItem>
					<ListGroupItem onClick={handleEndExamSession}>End Session</ListGroupItem>
					<ListGroupItem>
						<Button className="timer-btn">
							<Clock size={16} />
							{/* {timer} */}
							<CountdownTimer targetDate={dateTimeAfterDeadline} />
						</Button>
					</ListGroupItem>
				</ListGroup>
			</div>
		</div>
	);
}
export default MainTestHeader;
