import { graphqlurl, uploadUrl } from "@/utils/const";
import axios from "axios";

interface imageReture {
  status: boolean;
  data: unknown;
  message: string;
  function: string;
}

type ApiRespose<T> = {
  status: boolean;
  data: T;
  message: string;
};

export const ApiCall = async <T>(args: {
  query: string;
  variables: {
    [key: string]: unknown;
  };
  headers?: {
    [key: string]: string;
  };
}): Promise<ApiRespose<T>> => {
  try {
    const req = await axios.post(
      graphqlurl,
      {
        query: args.query,
        variables: args.variables,
      },
      { headers: args.headers }
    );
    if (
      req.data.data == null ||
      req.data.data == undefined ||
      req.data.data == ""
    ) {
      if (
        req.data.errors[0].extensions.originalError == undefined ||
        req.data.errors[0].extensions.originalError == null
      )
        return {
          status: false,
          data: {} as T,
          message: req.data.errors[0].message,
        };
      const errorMessage = Array.isArray(
        req.data.errors[0].extensions.originalError.message
      )
        ? req.data.errors[0].extensions.originalError.message[0]
        : req.data.errors[0].extensions.originalError.message;
      return { status: false, data: {} as T, message: errorMessage };
    }

    return { status: true, data: req.data.data, message: "" };
  } catch (error: unknown) {
    return {
      status: false,
      data: {} as T,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export async function UploadFile(file: File): Promise<imageReture> {
  const formData = new FormData();
  formData.append("file", file);
  const data = await axios({
    method: "post",
    url: `${uploadUrl}uploader/upload`,
    data: formData,
  });
  return data.data;
}
