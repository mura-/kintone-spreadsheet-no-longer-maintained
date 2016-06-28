var ErrorHandler = {
  apiError: (resp) => {
    var messages = "登録・更新時にエラーが発生しています。アプリの設定を見なおしてください\n";
    var bulkErrors = resp.results.filter((error) => {
       return error.code
    });
    bulkErrors.forEach((bulkError) => {
      Object.keys(bulkError.errors).forEach((key, i) => {
        messages += `${key}: ${bulkError.errors[key].messages.join(',')}\n`;
      });
    });
    alert(messages);
  }
};

export default ErrorHandler;
