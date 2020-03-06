const GITHUB_API_URL = 'https://api.github.com';

export async function fetchGithubApiV3(path, token) {
  const response = await fetch(
    `${GITHUB_API_URL}/${path}`,
    {
      method: 'GET',
      headers: { Authorization: `token ${token}` }
    }
  );
  return response.json();
}
