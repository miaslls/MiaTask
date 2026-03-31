// Lightweight i18n stub for extracted UI previews.
const dictionary: Record<string, string> = {
  'page-title': 'MiaTask',
  'meta.description': 'Simple and intuitive task list.',
  'meta.keywords': 'tasks, todo, list',
  'add-button': 'Add task',
  'loading': 'Loading...',
  'created': 'Task created',
  'updated': 'Task updated',
  'removed': 'Task removed',
  'done': 'Done',
  'tasklist-fail': 'Could not load task list.',
  'tasklist-empty': 'No tasks yet.',
  'create-placeholder': 'Write a task...',
  'update-placeholder': 'Update task text...',
  'update-task': 'Update task',
  'confirm': 'Confirm delete?',
  'cannot-undo': 'This action cannot be undone.',
  'font': 'Roboto Mono',
  'icons': 'Remix Icon',
  '404.page-title': 'Page not found',
  '404.link-text': 'Back to home',
  '500.page-title': 'Unexpected error',
  '500.instructions': 'Please try again later.',
  'common:error': 'Error',
  'a11y:aria.label.create-input': 'Task input',
  'a11y:aria.label.close-create': 'Close create form',
  'a11y:aria.label.go-back': 'Go back',
  'a11y:aria.label.toggle-complete': 'Toggle completion',
  'a11y:aria.label.details': 'View task details',
  'a11y:aria.label.modal-close': 'Close modal',
  'a11y:aria.label.update': 'Update task',
  'a11y:aria.label.delete': 'Delete task',
  'a11y:aria.label.star': 'Star task',
  'a11y:aria.label.go-home': 'Go to home',
  'a11y:aria.label.open-create': 'Open create form',
  'a11y:aria.label.change-locale': 'Change locale to {locale}',
  'a11y:aria.label.error-alert': 'Error alert',
  'a11y:aria.label.close-alert': 'Close error alert',
  'a11y:title.add': 'Add task',
  'a11y:title.back': 'Back',
  'a11y:title.submit': 'Submit',
  'a11y:title.update': 'Update',
  'a11y:title.delete': 'Delete',
  'a11y:title.details': 'Details',
  'a11y:title.toggle-complete': 'Toggle completion',
  'a11y:title.star': 'Star task',
  'a11y:title.close': 'Close',
  'a11y:title.close-create': 'Close',
  'a11y:title.create-input': 'Task input',
  'a11y:title.update-input': 'Update task input',
  'a11y:title.toggle-dark': 'Toggle dark mode',
  'a11y:title.home': 'Home',
  'a11y:title.link-github': 'Open GitHub profile',
  'a11y:title.link-font': 'Open font reference',
  'a11y:title.link-icon': 'Open icon reference',
  'title.close': 'Close',
};

function interpolate(value: string, params?: Record<string, string>) {
  if (!params) return value;

  return Object.entries(params).reduce(
    (acc, [key, replacement]) =>
      acc.replace(new RegExp(`\\{${key}\\}`, 'g'), replacement).replace(
        new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
        replacement,
      ),
    value,
  );
}

export default function useTranslation(namespace?: string) {
  const t = (key: string, params?: Record<string, string>) => {
    const namespacedKey = namespace ? `${namespace}.${key}` : key;
    const value = dictionary[key] ?? dictionary[namespacedKey] ?? key;

    return interpolate(value, params);
  };

  return { t };
}
