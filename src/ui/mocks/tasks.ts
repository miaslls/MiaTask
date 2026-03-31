import type { UiTask } from '../types';

export const mockTasks: UiTask[] = [
  {
    id: 'task-1',
    text: 'Write release notes',
    completed: false,
    starred: true,
    dateStringShort: 'Tue, 03/31',
    dateStringLong: 'Tuesday, 03/31/26',
    timeString: '10:15am',
  },
  {
    id: 'task-2',
    text: 'Review pull requests',
    completed: true,
    starred: false,
    dateStringShort: 'Mon, 03/30',
    dateStringLong: 'Monday, 03/30/26',
    timeString: '04:42pm',
  },
  {
    id: 'task-3',
    text: 'Prepare sprint board',
    completed: false,
    starred: false,
    dateStringShort: 'Sun, 03/29',
    dateStringLong: 'Sunday, 03/29/26',
    timeString: '09:05am',
  },
];

