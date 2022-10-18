// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import subject from './subjectSlice';
import questionnaire from './questionnaireSlice';
import instructions from './instructionsSlice';
import exam from './examSlice';
import student from './studentSlice';
import result from './resultSlice';
import papermaster from './papermasterSlice';

const rootReducer = {
	navbar,
	layout,
	auth,
	subject,
	questionnaire,
	instructions,
	exam,
	student,
	result,
	papermaster,
};

export default rootReducer;
