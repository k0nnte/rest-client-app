import Rest from '../components/Rest/Rest';

export async function loader({
  params,
}: {
  params: { metod: string; url: string };
}) {
  if (params.metod && params.url) {
    const endurl = atob(params.url);
    try {
      const response = await fetch(endurl, {
        method: params.metod,
      });
      const data = await response.json();
      return {
        response: response.status,
        data: data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          response: 500,
          error: error.message,
        };
      } else {
        return {
          response: 500,
          error: 'Unknown error',
        };
      }
    }
  } else {
    return;
  }
}
export default Rest;
