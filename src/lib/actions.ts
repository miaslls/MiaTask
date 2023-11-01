import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@src/lib/toast';
import { extendTask } from '@src/lib/format';
import type { ExtendedTask } from '@src/pages/index';

export type ToggleTaskActionParams = {
  id: string;
  action: 'complete' | 'star';
  translate: CallableFunction;
  lang: string;
};

export async function toggleTaskAction({
  id,
  action,
  translate,
  lang,
}: ToggleTaskActionParams): Promise<ExtendedTask | null> {
  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const key = `${tasklist}/${id}/${action}`;

  const response = await fetch(key, {
    method: 'PATCH',
    headers: { 'Accept-Language': lang },
  });

  if (response.ok) {
    toast.success(translate('done'), { id: toastId });
    mutate([tasklist, lang]);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
    return null;
  }

  const responseTask = await response.json().then((r) => r.task);

  return extendTask(responseTask, lang);
}
