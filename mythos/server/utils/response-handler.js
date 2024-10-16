exports.success_function = function (api_data){
    let response = {
        success : true,
        statusCode : 200,
        data : api_data.data ? api_data.data : null,
        message : api_data.message ? api_data.message : null
    }
    return response;
}

exports.error_function = function (api_data){

    let response = {
        success : false,
        statusCode : 400,
        data : api_data.data ? api_data.data : null,
        message : api_data.message ? api_data.message : null
    }
    return response;
}