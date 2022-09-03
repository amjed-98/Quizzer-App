import { lazy } from 'react';

export { default as Landing } from './Landing';
export { default as Error } from './Error';

export const QuizDetails = lazy(() => import('./Student/QuizDetails' /* webpackChunkName: "Student_QuizDetails_Page" */));
export const StudentProfile = lazy(() => import('./Student/StudentProfile' /* webpackChunkName: "Student_StudentProfile_Page" */));
export const PublicQuizzes = lazy(() => import('./Student/PublicQuizzes' /* webpackChunkName: "Student_PublicQuizzes_Page" */));
export const Leaderboard = lazy(() => import('./Student/Leaderboard' /* webpackChunkName: "Student_Leaderboard_Page" */));
export const Quiz = lazy(() => import('./Student/Quiz' /* webpackChunkName: "Student_Quiz_Page" */));
export const QuizResult = lazy(() => import('./Student/QuizResult' /* webpackChunkName: "Student_QuizResult_Page" */));

export const MyQuizzes = lazy(() => import('./Teacher/Quizzes' /* webpackChunkName: "Teacher_MyQuizzes_Page" */));
export const CreateQuiz = lazy(() => import('./Teacher/CreateQuiz' /* webpackChunkName: "Teacher_CreateQuiz_Page" */));
export const EnrolledStudents = lazy(() => import('./Teacher/EnrolledStudents' /* webpackChunkName: "Teacher_EnrolledStudents_Page" */));
export const TeacherProfile = lazy(() => import('./Teacher/TeacherProfile' /* webpackChunkName: "Teacher_TeacherProfile_Page" */));
