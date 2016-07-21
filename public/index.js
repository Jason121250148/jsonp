function jsonp(url, method, args, callback)
{
    var script = document.createElement("script");
    var callbackName = "__jsonp_callback" + Math.round(Math.random() * 100000);
    window[callbackName] = res => {
        window[callbackName] = null;
        delete window[callbackName];
        document.body.removeChild(script);
        callback(res);
    };
    script.src = `${url}?method=${method}&args=${encodeURIComponent(JSON.stringify(args))}&callback=${callbackName}`;
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
};


function jqueryP(url, method, args, callback)
{
    const pathUrl = `${url}?callback=?`;
    let callbackName = "__jsonp_callback" + Math.round(Math.random() * 100000);
    window[callbackName] = res => {
        window[callbackName] = null;
        delete window[callbackName];
        callback(res);
    };
    $.ajax({
        url: pathUrl,
        type: "get",
        data: args,
        async: true,
        dataType: "jsonp",
        jsonpCallback:callbackName,
    });
}
