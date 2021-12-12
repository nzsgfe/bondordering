class webUtil {
    getQueryStringValue = (key) => {
      return window.ImesWidget.getQueryStringValue(key);
    };
  
    isAjaxRequestPending(xmlHttpRequest) {
      return (
        xmlHttpRequest != null &&
        xmlHttpRequest.readyState > 0 &&
        xmlHttpRequest.readyState < 4
      );
    }
  
    getAsyncDataByFromType = (
      actionName,
      parameters,
      callBack,
      failedCallBack = null,
      isSecondTimeTry = false
    ) => {
      return this._getAjaxRequest(
        "application/x-www-form-urlencoded; charset=UTF-8",
        true,
        actionName,
        parameters,
        callBack,
        failedCallBack,
        isSecondTimeTry
      );
    };
  
    getAsyncDataByJsonType = (
      actionName,
      parameters,
      callBack,
      failedCallBack = null,
      isSecondTimeTry = false
    ) => {
      return this._getAjaxRequest(
        "application/json; charset=UTF-8",
        true,
        actionName,
        JSON.stringify(parameters),
        callBack,
        failedCallBack,
        isSecondTimeTry
      );
    };
  
    getSyncDataByFromType = (
      actionName,
      parameters,
      callBack,
      failedCallBack = null,
      isSecondTimeTry = false
    ) => {
      return this._getAjaxRequest(
        "application/x-www-form-urlencoded; charset=UTF-8",
        false,
        actionName,
        parameters,
        callBack,
        failedCallBack,
        isSecondTimeTry
      );
    };
  
    getSyncDataByJsonType = (
      actionName,
      parameters,
      callBack,
      failedCallBack = null,
      isSecondTimeTry = false
    ) => {
      return this._getAjaxRequest(
        "application/json; charset=UTF-8",
        false,
        actionName,
        JSON.stringify(parameters),
        callBack,
        failedCallBack,
        isSecondTimeTry
      );
    };
  
    getAsyncJsonData = (actionName, callBack, failedCallBack) => {
      return $.getJSON(actionName, callBack).fail(function () {
        if (failedCallBack) {
          failedCallBack();
        }
      });
    };
  
    getAsyncFile = (actionName, callBack, failedCallBack) => {
      return $.get(actionName, (data) => {
        callBack(data);
      }).fail(failedCallBack);
    };
  
    abortAjaxRequest = (xmlHttpRequest) => {
      if (xmlHttpRequest != null && xmlHttpRequest.readyState < 4) {
        xmlHttpRequest.abort();
      }
    };
  
    _getAjaxRequest = (
      contentType,
      isAsync,
      actionName,
      parameters,
      callback,
      failedCallBack,
      isSecondTimeTry
    ) => {
      let request = $.ajax({
        url: actionName,
        data: parameters,
        async: isAsync,
        contentType: contentType,
        dataType: "json",
        traditional: true,
        type: "POST",
        retryCount: 0,
        success: function (result) {
          return callback(result);
        },
        error: function (jqXHR, textStats, errorThrown) {
          if (isSecondTimeTry && this.retryCount < 1 && textStats !== "abort") {
            this.retryCount = this.retryCount + 1;
            $.ajax(this);
          } else {
            if (failedCallBack && textStats !== "abort") {
              if (jqXHR.status === 0 && jqXHR.readyState === 0) {
                window.setTimeout(() => {
                  return failedCallBack(errorThrown);
                }, 500);
              } else {
                return failedCallBack(errorThrown);
              }
            }
          }
          return false;
        }
      });
      request.parameters = parameters;
  
      return request;
    };
  }
  
  const webUtilConst = new webUtil();
  export default webUtilConst;
  