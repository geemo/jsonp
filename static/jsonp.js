function ajax(obj) {
    if (XMLHttpRequest) {

        if (obj && typeof obj === 'object') {

            var url = obj.url || '';
            var method = obj.method ? obj.method.toUpperCase() : 'GET';
            var async = obj.async || true;
            var jsonp = obj.jsonp || undefined;
            var headers = obj.headers || null;
            var date = obj.date || undefined;
            var success = obj.success || null;

            if (jsonp) {

                var script = document.createElement('script');
                script.src = url;
                document.body.appendChild(script);

            } else {

                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (success) {
                            if (new RegExp('json').test(xhr.getResponseHeader('Content-Type'))) {
                                success(xhr.status, JSON.parse(xhr.responseText));
                            } else {
                                success(xhr.status, xhr.responseText);
                            }
                        }
                    }
                };

                xhr.open(method, url, async);

                if (headers && typeof headers === 'object' && Object.keys(headers).length) {
                    for (var key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, headers[key]);
                        }
                    }

                    if (date && !headers['Content-Type']) {
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }
                }

                xhr.send(date);

            }

        }
    } else {
        throw new Error('您的浏览器太旧,请升级浏览器!');
    }


}


function jsonpCallback(obj) {
    alert('跨域请求访问返回对象:' + JSON.stringify(obj));
}

var btn = document.getElementById('btn');
btn.onclick = function(e) {
    // ajax({
    //     method: 'GET',
    //     url: 'http://localhost:3000/?callback=jsonpCallback',
    //     jsonp: 'jsonpCallback'
    // });
    ajax({
        method: 'GET',
        url: 'http://127.0.0.1/aaa',
        success: function(statusCode, result){
            alert(statusCode + ': ' + result);
        }
    });
};
