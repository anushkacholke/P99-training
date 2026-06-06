// export class ApiError extends Error {
//     constructor(message = "Something went wrong", statusCode = 500) {
//         super(message);

//         this.statusCode = statusCode;
//         this.success = false;

//         // Capture stack trace (for debugging)
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

export const errorHandler = (err, _req, res, _next) => {
    let error = { ...err };
    error.message = err.message;

    const statusCode = err.statusCode || 500;
    const errorCode = err.code || "INTERNAL_SERVER_ERROR";

    const errorMessage =
        statusCode === 500
            ? "Server Error. Please try again later."
            : err.message || "An error occurred";

    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message: errorMessage,
        },
    });
};