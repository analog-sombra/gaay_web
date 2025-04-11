import CryptoJS from "crypto-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { FieldErrors, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { FieldErrors, FieldValues } from "react-hook-form";


const due_date_of_month = 28;

const get28thDate = (): Date => {
  const today = new Date(); // Get the current date
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based month index
  return new Date(year, month, due_date_of_month); // Set the date to the 28th of the current month
};

export { due_date_of_month, get28thDate };

/**
 * Converts an error object or string to a string format.
 * If the input is a string, it converts it to uppercase.
 * If the input is an Error object, it returns the error message.
 * @param {unknown} e - The error object or string to convert.
 * @returns {string} The error message in string format.
 */

const errorToString = (e: unknown): string => {
  let err: string = "";
  if (typeof e === "string") {
    err = e.toUpperCase();
  } else if (e instanceof Error) {
    err = e.message;
  }
  return err;
};

export { errorToString };

/**
 * Check if the given string contains any space character.
 * @param {string} value - The string to check for spaces.
 * @returns {boolean} True if the string contains a space, false otherwise.
 */
const isContainSpace = (value: string): boolean => {
  return !value.includes(" ");
};

export { isContainSpace };

/**
 * Converts a given string to capital case by capitalizing the first letter of each word.
 * @param {string} value - The input string to convert to capital case.
 * @returns {string} The input string converted to capital case.
 */
const capitalcase = (value: string): string => {
  const words = value.split(" ");

  const capitalWords = words.map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  });

  return capitalWords.join(" ");
};

export { capitalcase };

const onlyNumbersRegex = /^[0-9]*$/;

/**
 * Handles the change event for a number input field in a React component.
 * If the input value does not match the regex pattern for numbers, it clears the input field.
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event object
 * @returns None
 */
const handleNumberChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { value } = event.target;
  if (!onlyNumbersRegex.test(value)) {
    event.target.value = event.target.value.slice(0, -1);
  }
};

export { handleNumberChange };

const onlyDecimalRegex = /^[0-9.]*$/;

/**
 * Handles the change event for an input element to allow only decimal values.
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The change event object.
 * @returns None
 */
const handleDecimalChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { value } = event.target;
  if (!onlyDecimalRegex.test(value)) {
    event.target.value = event.target.value.slice(0, -1);
  }
};

export { handleDecimalChange };

/**
 * Truncates a given text to a specified length and appends "..." if the text exceeds the length.
 * @param {string} text - The text to truncate.
 * @param {number} long - The maximum length of the truncated text.
 * @returns The truncated text with "..." appended if it exceeds the specified length.
 */
const longtext = (text: string, long: number): string => {
  if (text.length <= long) {
    return text;
  } else {
    return text.substring(0, long) + " ...";
  }
};
export { longtext };

const formatDateTime = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const meridiem = date.getHours() < 12 ? "AM" : "PM";

  const formattedTime =
    (hours % 12 || 12) +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    " " +
    meridiem;

  //  if month and day is less than 10, add 0 before month
  if (month < 10 && day < 10) {
    return `0${day}-0${month}-${year} ${formattedTime}`;
  } else if (month < 10) {
    return `${day}-0${month}-${year} ${formattedTime}`;
  } else if (day < 10) {
    return `0${day}-${month}-${year} ${formattedTime}`;
  } else {
    return `${day}-${month}-${year} ${formattedTime}`;
  }
};

export { formatDateTime };

const formateDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10 && day < 10) {
    return `0${day}-0${month}-${year}`;
  } else if (month < 10) {
    return `${day}-0${month}-${year}`;
  } else if (day < 10) {
    return `0${day}-${month}-${year}`;
  } else {
    return `${day}-${month}-${year}`;
  }
};

export { formateDate };

const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export { removeDuplicates };

const numberWithIndianFormat = (x: number) => {
  const parts = x
    .toLocaleString("en-IN", { maximumFractionDigits: 2 })
    .split(".");
  return parts.join(".");
};
export default numberWithIndianFormat;

const getEnumData = <T extends object>(
  enumObject: T
): { value: T[keyof T]; label: string }[] => {
  return Object.keys(enumObject).map((key) => ({
    value: enumObject[key as keyof T],
    label: key,
  }));
};

export { getEnumData };

// const encrypt = (value: string): string => {
//   return CryptoJS.AES.encrypt(value, process.env.DATABASE_KEY!).toString();
// };

// export { encrypt };

// const decrypt = (value: string): string => {
//   const bytes = CryptoJS.AES.decrypt(value, process.env.DATABASE_KEY!);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

// export { decrypt };

const addPrismaDatabaseDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 5);
  newDate.setMinutes(newDate.getMinutes() + 30);
  return newDate;
};

const getPrismaDatabaseDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 5);
  newDate.setMinutes(newDate.getMinutes() - 30);
  return newDate;
};

export { addPrismaDatabaseDate, getPrismaDatabaseDate };

// multiplication table
const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

// permutation table
const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// validates Aadhar number received as string
const validateAadharCard = (aadharNumber: string): boolean => {
  let c: number = 0;
  const invertedArray = aadharNumber.split("").map(Number).reverse();

  invertedArray.forEach((val, i) => {
    c = d[c][p[i % 8][val]];
  });

  return c === 0;
};

const validatePanCard = (panNumber: string): boolean => {
  const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(panNumber);
};

export { validateAadharCard, validatePanCard };

const onFormError = <T extends FieldValues>(error: FieldErrors<T>) => {
  const firstErrorMessage = Object.values(error)[0]?.message;

  setTimeout(() => {
    if (firstErrorMessage) {
      const errorElement = Array.from(document.querySelectorAll("p")).find(
        (el) => el.textContent == firstErrorMessage
      );
      if (errorElement) {
        // Scroll to the error message element
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }
    }
  }, 1000);
};

export { onFormError };

function getDaysBetweenDates(startDate: Date, endDate: Date): number {
  // Calculate the difference in milliseconds
  const differenceInTime = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.ceil(differenceInDays); // Rounds up to the nearest whole day
}

export { getDaysBetweenDates };

const getPreviousMonth = (date: Date): Date => {
  const previousMonthDate = new Date(date);
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  return previousMonthDate;
};

const getMonthDifference = (date1: Date, date2: Date): number => {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
};

const getDateFromMonth = (args: {
  year: number;
  month: string;
  date: number;
}): Date => {
  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(args.month);
  return new Date(args.year, monthIndex, args.date);
};

export { getPreviousMonth, getMonthDifference, getDateFromMonth };

const generatePDF = async (path: string) => {
  try {
    // Fetch the PDF from the server

    const response = await fetch("/api/getpdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: path }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();

    // Create a link element for the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "output.pdf";

    // Programmatically click the link to trigger the download
    link.click();
  } catch {
    toast.error("Unable to download pdf try again.");
  }
};

export { generatePDF };

const secretKey = "knf92fg#G$%2Ij309pwkn4gf#WTF#WCc2@#$WTfwe4gFVD";

// Helper functions for URL-safe Base64 encoding and decoding
const toBase64Url = (str: string): string =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromBase64Url = (str: string): string =>
  str.replace(/-/g, "+").replace(/_/g, "/") + "==".slice(str.length % 4 || 4);

export const encryptURLData = (data: string): string => {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return toBase64Url(encryptedData);
};

export const decryptURLData = (
  cipherText: string,
  router: AppRouterInstance
): string => {
  try {
    const decodedCipherText = fromBase64Url(cipherText); // Convert back from URL-safe Base64
    const bytes = CryptoJS.AES.decrypt(decodedCipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    router.back();
    return "";
  }
};

const isNegative = (value: number): boolean => {
  return value < 0;
};

export { isNegative };
