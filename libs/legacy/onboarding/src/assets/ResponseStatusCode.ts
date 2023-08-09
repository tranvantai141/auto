class ResponseStatusCode {
  public static readonly informational = {
    continue: 100,
    switching_protocols: 101,
    processing: 102,
  };

  public static readonly success = {
    okey: 200,
    created: 201,
    accepted: 202,
    non_authoritative: 203,
    no_content: 204,
    reset_content: 205,
    partial_content: 206,
    multi_status: 207,
    already_reported: 208,
  };

  public static readonly redirection = {
    multiple_choices: 300,
    moved_permanently: 301,
    found: 302,
    see_other: 303,
    not_modified: 304,
    use_proxy: 305,
    temporary_redirect: 307,
    permanent_redirect: 308,
  };

  public static readonly clientError = {
    bad_request: 400,
    unauthorized: 401,
    payment_required: 402,
    forbidden: 403,
    not_found: 404,
    not_allowed_method: 405,
    not_acceptable: 406,
    proxy_authentication_required: 407,
    request_timeout: 408,
    conflict: 409,
    gone: 410,
    length_required: 411,
    precondition_failed: 412,
    payload_large: 413,
    uri_long: 414,
    unsupported_media_type: 415,
    expectation_failed: 417,
    misdirected_request: 421,
    locked: 423,
    failed_dependency: 424,
    upgrade_required: 426,
    precondition_required: 428,
    too_many_request: 429,
    request_header_fields_too_large: 431,
    connection_closed_without_response: 444,
    unavailable_for_legal_reasons: 451,
    client_closed_request: 499,
  };

  public static readonly serverError = {
    internal_server_error: 500,
    not_implemented: 501,
    bad_gateway: 502,
    service_unavailable: 503,
    gateway_timeout: 504,
    http_version_not_supported: 505,
    insufficient_storage: 507,
    loop_detected: 508,
    not_extended: 510,
    network_authentication_required: 511,
    network_timeout_error: 599,
  };
}

export default ResponseStatusCode;
