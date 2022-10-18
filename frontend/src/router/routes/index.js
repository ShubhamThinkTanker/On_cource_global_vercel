import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import QuestionnaireRoutes from './Questionnaire';
import SubjectRoutes from './Subject';
import InstructionsRoutes from './Instructions';
import StudentRoutes from './Students';
import PapermasterRoutes from './Papermaster';
// ** Document title
const TemplateTitle = 'OnCourseGlobal';

// ** Default Route
const DefaultRoute = '/home';

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...AuthenticationRoutes,
	...QuestionnaireRoutes,
	...SubjectRoutes,
	...InstructionsRoutes,
	...StudentRoutes,
	...PapermasterRoutes,
];
export { DefaultRoute, TemplateTitle, Routes };
