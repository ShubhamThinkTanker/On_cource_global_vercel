import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, CustomInput, Label } from 'reactstrap';
import {
	storedLocaliazedQuestions,
	handleLocalizedQuestion,
	handleSelectAnswerByStudent,
} from '../../../../redux/examSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import ClassicEditor from '@blowstack/ckeditor5-full-free-build';

function MainTest({ fontSize }) {
	const dispatch = useDispatch();
	const { instructionsData } = useSelector((state) => state.instructions);
	const {
		currentSelectedSubject,
		currentSelectedQuestion,
		questionByID,
		examData,
		localiazedQuestions,
	} = useSelector((state) => state.exam);
	const [checkedOption, setCheckedOption] = useState('');
	const Options = questionByID?.options[0];

	const filteredInstrunctions = useMemo(() => {
		return instructionsData?.findAllInstruction?.filter(
			(item) => item.subject_name === currentSelectedSubject
		);
	}, [instructionsData, currentSelectedSubject]);

	useEffect(() => {
		const localAns = localiazedQuestions?.filter(
			(item) => item.questionnaire_id === questionByID?._id
		)[0]?.submited_ans;
		setCheckedOption(localAns);
	}, [localiazedQuestions, questionByID]);

	useEffect(() => {
		if (localStorage.getItem('QuestionsList') === null && examData?.questionnaire) {
			const questionsData = [];
			examData?.questionnaire?.forEach((question) =>
				questionsData.push({
					subject_id: question.subject_id,
					questionnaire_id: question._id,
					submited_ans: '',
					submited_answered: '',
				})
			);
			setTimeout(() => dispatch(storedLocaliazedQuestions(questionsData)), 300);
			// localStorage.setItem('QuestionsList', JSON.stringify(questionsData));
		}
	}, [examData, dispatch]);

	const handleOptionsChange = (key, value) => {
		setCheckedOption(value);
		dispatch(handleSelectAnswerByStudent({ key, value }));
		dispatch(handleLocalizedQuestion(questionByID._id));
	};
	return (
		<div className="main-test">
			<Row>
				<Col lg="6" md="6" className="main-test-col">
					{currentSelectedQuestion === 0 ? (
						filteredInstrunctions?.length > 0 &&
						filteredInstrunctions?.map((instruction) => (
							<div
								key={instruction._id}
								className="question-list"
								style={{ fontSize: `${fontSize}px` }}
							>
								{instruction?.description}
							</div>
						))
					) : (
						<Label style={{ fontSize: `${fontSize}px`, pointerEvents: 'none' }} className="mt-1">
							<CKEditor
								config={{
									removePlugins: ['Title', 'toolbar'],
									toolbar: [],
								}}
								editor={ClassicEditor}
								data={questionByID?.question}
							/>
						</Label>
						// <div className="question-list" style={{ fontSize: `${fontSize}px` }}>
						// 	{questionByID?.question}
						// </div>
					)}
				</Col>
				<Col lg="6" md="6" className="answer-list-col">
					{currentSelectedQuestion !== 0 && (
						<div className="answer-list">
							{Options &&
								Object.entries(Options)?.map(([key, value]) => (
									<div className="d-flex align-items-center " key={key}>
										<CustomInput
											type="radio"
											id={`option${key}`}
											name="is_type"
											block
											className="d-flex pl-3 mt-1"
											defaultValue={value}
											onChange={() => handleOptionsChange(key, value)}
											checked={value == checkedOption ? true : false}
										/>
										<Label
											style={{ fontSize: `${fontSize}px`, pointerEvents: 'none' }}
											className="mt-1"
										>
											<CKEditor
												config={{
													removePlugins: ['Title', 'toolbar'],
													toolbar: [],
												}}
												editor={ClassicEditor}
												data={value}
											/>
										</Label>
									</div>
								))}
						</div>
					)}
				</Col>
			</Row>
		</div>
	);
}
export default MainTest;
