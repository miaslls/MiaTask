export function getThemeCookie(cookieString: string) {
  return cookieString
    .split('; ')
    .map((cookie) => {
      const [name, value] = cookie.split('=');
      return { name, value };
    })
    .filter((cookie) => cookie.name === 'theme')[0];
}
