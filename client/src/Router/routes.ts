import { JSXElementConstructor } from 'react';
import {
  StudentProfile,
  Leaderboard,
  PublicQuizzes,
  CreateQuiz,
  Quiz,
  QuizDetails,
  QuizResult,
  TeacherProfile,
  MyQuizzes,
  Landing,
  EnrolledStudents,
  Error,
} from '../Pages';

type TRoutes = ReadonlyArray<{
  path: '/' | '/student' | '/teacher' | '*' | '/server-error';
  Element?: JSXElementConstructor<any>;

  children?: ReadonlyArray<{
    path: string;
    Element: JSXElementConstructor<Record<string, never>>;
    auth?: true;
  }>;
}>

const ROUTES: TRoutes = [
  {
    path: '/',
    Element: Landing,
  },

  //* Student Routes
  {
    path: '/student',
    children: [
      {
        path: '',
        Element: PublicQuizzes,
      },
      {
        path: 'quiz-details',
        Element: QuizDetails,
      },
      {
        path: 'leaderboard',
        Element: Leaderboard,
      },
      {
        path: 'quiz/enroll',
        Element: Quiz,
      },
      {
        path: 'quiz/result',
        Element: QuizResult,
      },
      {
        path: 'profile',
        Element: StudentProfile,
        auth: true,
      },
    ],
  },

  //* Teacher Routes
  {
    path: '/teacher',
    children: [
      {
        path: '',
        Element: MyQuizzes,
        auth: true,
      },
      {
        path: 'quiz/:quizId',
        Element: EnrolledStudents,
        auth: true,
      },
      {
        path: 'quiz/new',
        Element: CreateQuiz,
        auth: true,
      },
      {
        path: 'profile',
        Element: TeacherProfile,
        auth: true,
      },
    ],
  },

  //* Error Routes
  {
    path: '*',
    Element: Error,
  },

  {
    path: '/server-error',
    Element: Error,
  },
];

export default ROUTES;
