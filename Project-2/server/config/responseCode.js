const responseCode = {
    "internalServerError":500,
    "badRequest":400,
    "unauthorised":401,
    "forbidden":403,
    "notFound":404,
    "successful":200,
    "resourceCreated":201,
    "acceptedButNotProcessed":202,
    "noContent":204
} 

export default responseCode;

// 500 Internal Server Error: The server encountered a situation it doesn't know how to handle.
// 400 Bad Request: The server could not understand the request due to invalid syntax.
// 401 Unauthorized: The client must authenticate itself to get the requested response.
// 403 Forbidden: The client does not have access rights to the content.
// 404 Not Found: The server cannot find the requested resource.
// 200 OK: The request was successful, and the server has returned the requested resource.
// 201 Created: The request was successful, and a new resource was created as a result.
// 202 Accepted: The request has been received but not yet acted upon. It is non-committal.
// 204 No Content: The server successfully processed the request, but there is no content to send in the response.