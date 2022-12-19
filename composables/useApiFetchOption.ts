const useApiFetchOption = () => {
  const config = useRuntimeConfig();
  const accessToken = localStorage.auth_token;

  return {
    baseURL: config.public.apiServerUrl,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
};

export default useApiFetchOption;
