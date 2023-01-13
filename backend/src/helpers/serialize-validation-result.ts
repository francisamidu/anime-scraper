import { ValidationError } from "express-validator";

const serializeValidationResult = (validationError: ValidationError) => {
  const { msg, param, value } = validationError;

  if (value === "" && param === "createdAt") {
    return {
      message: "CreatedAt Date is required",
      success: false,
    };
  } else if (msg === "Invalid Value" && param === "createdAt") {
    return {
      message: "Please provide a valid Date",
      success: false,
    };
  }
  if (value === "" && param === "link") {
    return {
      message: "Anime link is required",
      success: false,
    };
  } else if (msg === "Invalid Value" && param === "link") {
    return {
      message: "Please provide a valid link",
      success: false,
    };
  }

  if (value === "" && param === "title") {
    return {
      message: "Title is required",
      success: false,
    };
  } else if (msg === "Invalid Value" && param === "title") {
    return {
      message: "Please provide a valid title",
      success: false,
    };
  }

  if (value === "" && param === "fullName") {
    return {
      message: "Full name is required",
      success: false,
    };
  } else if (msg === "Invalid Value" && param === "fullName") {
    return {
      message: "Please provide a valid full name",
      success: false,
    };
  }

  if (value === "" && param === "image") {
    return {
      message: "Image is required",
      success: false,
    };
  } else if (msg === "Invalid Value" && param === "image") {
    return {
      message: "Please provide a valid Image",
      success: false,
    };
  }
};
export default serializeValidationResult;
