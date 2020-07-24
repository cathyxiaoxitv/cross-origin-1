function ajax(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(request);
        }
      }
    };
    request.send();
  });
}
ajax("get", "http://qq.com:9999/friends.json").then(response => {
  console.log("通过CORS我成功地用AJAX请求到了qq.com的数据啦👇");
  console.log(typeof response);
  console.log(response);
});
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = "haixiJSONPCallbackName" + Math.random();
    window[random] = data => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://qq.com:9999/friends.js").then(data => {
  console.log(`通过JSONP我也成功请求到qq.com的数据啦👇`)
  console.log(typeof data);
  console.log(data);
});
