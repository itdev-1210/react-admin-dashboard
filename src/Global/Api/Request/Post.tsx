import axios from 'axios';

interface PostRequestParams {
  headers?: {};
  data: any;
  baseUrl?: string;
  url: string;
}

interface PostRequestResponse {
  error?: object;
  data?: any;
  status?: number;
}

const PostRequest = async ({ 
  headers, 
  data, 
  baseUrl, 
  url 
}: PostRequestParams): Promise<PostRequestResponse> => {

  try {
    const Request = await axios({
      headers: {
        'content-type': 'application/json',
        ...headers || {},
      },
      data,
      baseURL: baseUrl,
      method: 'POST',
      url,
    })
  
    return {
      data: Request.data,
      status: Request.status,
    };
  } catch (err) {

    if ( err?.response?.data ) {
      return {
        error: err?.response?.data,
      };
    }

    return {
      error: { status: 500, message: 'Internal Error' },
    };
  }
}

export default PostRequest;