def validate_request_body_body(request_body, required_fields, invalid_fields):
    """
    Validate the request body
    Return the request body if valid
    Raise an exception if invalid
    """
    
    # Check if the request body has the required fields
    for field in required_fields:
        if field not in request_body:
            raise Exception('Missing required field: {}'.format(field))
    
    # Check if the request body has any invalid fields
    for field in request_body:
        if field in invalid_fields:
            raise Exception('Invalid field: {}'.format(field))
    
    return request_body