const Core = require('@alicloud/pop-core');

exports.sendMsg = function(phoneNumber, secretNumber, user, success, failed) {
  var client = new Core({
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  });
  var TemplateParam = {
    url: `${secretNumber}/${user}`
  }
  var params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": phoneNumber,
    "SignName": "firelocater",
    "TemplateCode": "SMS_162737921",
    "TemplateParam": JSON.stringify(TemplateParam)
  }
  
  var requestOption = {
    method: 'POST'
  };
  
  client.request('SendSms', params, requestOption).then((result) => {
    success(result)
  }, (ex) => {
    failed(ex)
  })
};

exports.transformNumbers = function (num) {
  var arr = num.split("");
  for(let i = 0; i < arr.length; i ++) {
    switch (arr[i]) {
      case '1':arr[i] = 'A';break;
      case '2':arr[i] = 'B';break;
      case '3':arr[i] = 'C';break;
      case '4':arr[i] = 'D';break;
      case '5':arr[i] = 'E';break;
      case '6':arr[i] = 'F';break;
      case '7':arr[i] = 'G';break;
      case '8':arr[i] = 'H';break;
      case '9':arr[i] = 'I';break;
      case '0':arr[i] = 'J';break;
    }
  }
  return arr.join("");
};